import { MediaTransformer, OpenAPI } from '@zix/api'
import { randomUUID } from 'expo-crypto'
import type { ImagePickerAsset } from 'expo-image-picker'
import { Platform } from 'react-native'

const re: any = /(?:\.([^.]+))?$/

export const uploadMediaFile = async (
  file: ImagePickerAsset,
  onProgressUpdate: (progress: number) => void = () => {}
): Promise<MediaTransformer> =>
  new Promise(function (resolve, reject) {
    const UPLOAD_URL = `${OpenAPI.BASE}/api/media/uploads`

    if (!file) {
      reject({
        status: 400,
        statusText: 'No file provided',
      })
    }
    const xhr = new XMLHttpRequest()
    xhr.open('POST', UPLOAD_URL, true)
    xhr.setRequestHeader('Accept', 'application/json')

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
          2
        )
      )
      onProgressUpdate(event.loaded / event.total)
    })
    xhr.onload = async function () {
      if (this.status >= 200 && this.status < 300) {
        const data = JSON.parse(xhr.response)
        resolve(data)
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        })
      }
    }
    xhr.onerror = function (error) {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        error,
      })
    }

    // Create a FormData object
    const formData = new FormData()

    // Append the file to the FormData object
    formData.append('file', {
      uri: Platform.OS == 'ios' ? file.uri.replace('file://', '') : file.uri,
      name: `file.${re.exec(file.uri)[1]}`,
      type: file.type,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    formData.append('uuid', randomUUID())

    xhr.send(formData)
  })
