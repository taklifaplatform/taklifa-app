import { MediaTransformer, OpenAPI } from '@zix/api';

export type UploadableMediaFile = {
  uri: string;
  type: string;
  file_name: string;
  file_type: string;
  mime_type: string;
  uuid: string;
};

export const uploadMediaFile = async (
  file: UploadableMediaFile,
  onProgressUpdate: (progress: number) => void = () => null,
): Promise<MediaTransformer> => {
  const vaporSignedUrl = await fetch(`${OpenAPI.BASE}/api/media/s3-upload-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${OpenAPI.TOKEN}`,
    },
    body: JSON.stringify({
      filename: `${file.uuid}-${file.file_name}`,
    }),
  })
  const vaporSignedUrlData = await vaporSignedUrl.json();
  console.log('================');
  console.log('vaporSignedUrl::', JSON.stringify(vaporSignedUrlData, null, 2));
  console.log('================');
  if (!vaporSignedUrlData.url) {
    throw new Error("Cannot upload media file");
  }
  return new Promise(function (resolve, reject) {
    const upload = async () => {
      try {
        console.log('================');
        console.log('UPLOADING MEDIA::', file);
        console.log('================');

        if (!file) {
          reject({
            status: 400,
            statusText: 'No file provided',
          });
          return;
        }

        // Fetch the file as a blob
        let fileBlob: Blob;
        try {
          if (file?.uri?.includes('base64,')) {
            // Remove metadata from base64 string
            const base64Data = file.uri.split(',')[1];
            // Convert base64 to binary
            const binaryData = atob(base64Data);
            // Convert binary to ArrayBuffer
            const arrayBuffer = new ArrayBuffer(binaryData.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < binaryData.length; i++) {
              uint8Array[i] = binaryData.charCodeAt(i);
            }
            fileBlob = new Blob([arrayBuffer], { type: file.mime_type });
          } else {
            // Use fetch to get the file as a blob
            const response = await fetch(file.uri);
            fileBlob = await response.blob();
          }
        } catch (error) {
          console.log('=========');
          console.log('MEDIA UPLOAD BUILDING BLOB ERROR::', error);
          console.log('=========');
          alert((error as Error)?.message || 'Error preparing file for upload');
          reject(error);
          return;
        }

        // Use XMLHttpRequest to support progress events
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', vaporSignedUrlData.url, true);
        // Only set Content-Type if required by the signed URL
        if (file.mime_type) {
          xhr.setRequestHeader('Content-Type', file.mime_type);
        }
        // Do NOT set Authorization header for S3 signed URL
        // xhr.setRequestHeader('Authorization', `Bearer ${OpenAPI.TOKEN}`);

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = event.loaded / event.total;
            console.info(
              'UPLOAD PROGRESS::',
              JSON.stringify({
                loaded: event.loaded,
                total: event.total,
                progress,
              }, null, 2),
            );
            onProgressUpdate(progress);
          }
        });
        xhr.onload = async function () {
          // S3 does not return a JSON response for PUT
          if (this.status >= 200 && this.status < 300) {
            const convertToSpatieTemporaryUrl = await fetch(`${OpenAPI.BASE}/api/media/s3-upload-url/convert`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${OpenAPI.TOKEN}`,
              },
              body: JSON.stringify({
                key: vaporSignedUrlData.key,
                uuid: file.uuid,
                filename: file.file_name,
              }),
            })
            const convertToSpatieTemporaryUrlData = await convertToSpatieTemporaryUrl.json();
            console.log('convertToSpatieTemporaryUrlData::', convertToSpatieTemporaryUrlData);
            
            // Optionally, you may want to notify your backend that the upload is complete
            // For now, resolve with the vaporSignedUrlData or a custom object
            resolve({  uuid: file.uuid,...convertToSpatieTemporaryUrlData, } as any);
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText,
              response: xhr.response,
            });
          }
        };
        xhr.onerror = function (error) {
          console.log('=========');
          console.log('MEDIA UPLOAD ERROR::', error);
          console.log('=========');
          reject({
            status: this.status,
            statusText: xhr.statusText,
            error,
          });
        };

        xhr.send(fileBlob);
      } catch (error) {
        console.log('=========');
        console.log('MEDIA UPLOAD ERROR::', error);
        console.log('=========');
        reject(error);
      }
    };
    upload();
  });
};
