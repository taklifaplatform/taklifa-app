import { MediaTransformer, OpenAPI } from '@zix/api';
import { randomUUID } from 'expo-crypto';
import { MediaTypeOptions } from 'expo-image-picker';
import { Platform } from 'react-native';
//import * as ImageManipulator from 'expo-image-manipulator';
import dynamic from 'next/dynamic';
// import * as Sentry from 'sentry-expo'


// TODO:: Test for Mobile
const ImageManipulator = dynamic(() => import('expo-image-manipulator'), {
  ssr: false,
});

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
  return new Promise(function (resolve, reject) {
    const UPLOAD_URL = `${OpenAPI.BASE}/api/media/uploads`;

    console.log('================');
    console.log('UPLOADING MEDIA::', file);
    console.log('UPLOAD_URL::', UPLOAD_URL);
    console.log('================');

    if (!file) {
      reject({
        status: 400,
        statusText: 'No file provided',
      });
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', UPLOAD_URL, true);
    xhr.setRequestHeader('Accept', 'application/json');
    // auth token
    xhr.setRequestHeader('Authorization', `Bearer ${OpenAPI.TOKEN}`);

    xhr.upload.addEventListener('progress', (event) => {
      console.info(
        'UPLOAD PROGRESS::',
        JSON.stringify(
          {
            loaded: event.loaded,
            total: event.total,
            progress: event.loaded / event.total,
          },
          null,
          2,
        ),
      );
      onProgressUpdate(event.loaded / event.total);
    });
    xhr.onload = async function () {
      const data = JSON.parse(xhr.response);
      console.log('=========');
      console.log('MEDIA UPLOAD SUCCESS::', data);
      console.log('=========');
      if (this.status >= 200 && this.status < 300) {
        resolve(data);
      } else {
        reject(data);
      }
    };
    xhr.onerror = function (error) {
      console.log('=========');
      console.log('MEDIA UPLOAD ERROR::', error);
      console.log('=========');
      // Sentry.(error);
      reject({
        status: this.status,
        statusText: xhr.statusText,
        error,
      });
    };

    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData object
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
        // Create Blob from ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: file.mime_type }); // Change type accordingly
        // Create FormData
        formData.append('file', blob, file.file_name);
      } else {
        console.log('file.uri', file.uri);
        console.log('file.file_type', file.file_type);
        formData.append('file', {
          // uri: ['ios', 'android'].includes(Platform.OS)
          //   ? file.uri.replace('file://', '')
          //   : file.uri,
          uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
          // uri:
          //   Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
          name: file.file_name,
          type: 'image/jpeg',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      }
    } catch (error) {
      console.log('=========');
      console.log('MEDIA UPLOAD BUILDING FORM OBJECT ERROR::', error);
      console.log('=========');
      alert(error?.message);
      reject(error);
    }

    formData.append('uuid', file.uuid || randomUUID());

    xhr.send(formData);
  });
};
