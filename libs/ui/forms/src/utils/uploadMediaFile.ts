import { MediaTransformer, OpenAPI } from "@zix/api";
import { randomUUID } from "expo-crypto";
import { Platform } from "react-native";

export type UploadableMediaFile = {
  uri: string;
  type: string;
  file_name: string;
  mime_type: string;
  uuid: string;
};

export const uploadMediaFile = async (
  file: UploadableMediaFile,
  onProgressUpdate: (progress: number) => void = () => null,
): Promise<MediaTransformer> =>
  new Promise(function (resolve, reject) {
    const UPLOAD_URL = `${OpenAPI.BASE}/api/media/uploads`;


    if (!file) {
      reject({
        status: 400,
        statusText: "No file provided",
      });
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", UPLOAD_URL, true);

    xhr.setRequestHeader("Accept", "application/json");
    // auth token
    xhr.setRequestHeader("Authorization", `Bearer ${OpenAPI.TOKEN}`);


    xhr.upload.addEventListener("progress", (event) => {
      console.info(
        "UPLOAD PROGRESS::",
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
      if (xhr.response?.includes('Entity Too Large')) {
        reject({
          status: 413,
          statusText: "File too large",
        });
        return
      }
      const data = JSON.parse(xhr.response);
      if (this.status >= 200 && this.status < 300) {
        resolve(data);
      } else {
        reject(data);
      }
    };
    xhr.onerror = function (error) {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        error,
      });
    };

    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData object
    if (file?.uri?.includes("base64,")) {
      // Remove metadata from base64 string
      const base64Data = file.uri.split(",")[1];
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
      formData.append("file", blob, file.file_name);
    } else {
      formData.append("file", {

        uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
        name: `${file.uuid}.jpg`,
        // name: file.file_name,
        type: 'image/jpeg',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }

    formData.append("uuid", file.uuid || randomUUID());

    xhr.send(formData);
  });
