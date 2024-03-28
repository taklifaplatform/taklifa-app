import { randomUUID } from 'expo-crypto';

import { Alert, Platform } from 'react-native';

import { Camera, Image, Paperclip } from '@tamagui/lucide-icons';
import { MediaService, MediaTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { getDocumentAsync } from 'expo-document-picker';
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { UploadableMediaFile, uploadMediaFile } from '../../utils';
import { ZixFilesInputMediaPickerPreviewer, ZixImageMediaPickerPreviewer, ZixRowMediaPickerPreviewer } from './previewers';
import { ZixMediaPickerTransformer } from './types';

/**
 * Previewers Specifications:
 * - image:
 *    Centered circular image with a plus icon in the middle
 *    Can be used for company logo, profile picture, etc.
 * - files:
 *    ZixInput with a plus icon in the left to select multiple files or a single file
 * - medias:
 *    Multiple images displayed in a row with a plus icon in the last
 */
export const MediaPreviewers = {
  image: ZixImageMediaPickerPreviewer,
  medias: ZixRowMediaPickerPreviewer,
  files: ZixFilesInputMediaPickerPreviewer,
  file: ZixFilesInputMediaPickerPreviewer,
}

export type ZixMediaPickerFieldProps = {
  type: 'medias' | 'image' | 'files' | 'file';
  hasError?: boolean;
  isMultiple?: boolean;
  value?: MediaTransformer | MediaTransformer[];
  onChange: (value: MediaTransformer | MediaTransformer[]) => Promise<void> | void;
  placeholder?: string;
};

export const ZixMediaPickerField: React.FC<ZixMediaPickerFieldProps> = ({
  isMultiple,
  type = 'medias',
  onChange,
  value,
  placeholder
}) => {
  const Previewer = MediaPreviewers[type]

  const actionRef = useRef<ActionSheetRef>(null);

  const [previews, setPreviews] = useState<Record<string | number, ZixMediaPickerTransformer>>({});

  useEffect(() => {
    console.log('==== ZixMediaPickerField =========')
    console.log('value::', JSON.stringify(value, null, 2))
    console.log('isArray::', Array.isArray(value))
    console.log('=============')
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      const _medias: Record<string, any> = {}
      files.forEach(file => {
        if (file.uuid) {
          _medias[file.uuid] = file
        } else {
          _medias[file.id] = file
        }
      })
      setPreviews(prev => ({
        ...prev,
        ..._medias
      }));
    }
  }, [value]);

  const renderImagePicker = () => {
    const actions = [
      {
        name: t(`core:media_picker.camera`),
        icon: <Camera size="$1.5" color="$color10" />,
        onPress: launchCamera,
      },
      {
        name: t(`core:media_picker.select_media`),
        icon: <Image size="$1.5" color="$color10" />,
        onPress: launchMediaPicker,
      },
    ]

    if (type === 'files' || type === 'file') {
      actions.push({
        name: t(`core:media_picker.select_document`),
        icon: <Paperclip size="$1.5" color="$color10" />,
        onPress: launchDocumentPicker,
      });
    }


    return (
      <ActionSheet
        title={t(`core:media_picker.title`)}
        actions={actions}
        ref={actionRef}
      />
    )
  };

  /**
   * Handles the selection of files in the media picker.
   * @param files The selected files.
   */
  async function onFilesSelected(files: ZixMediaPickerTransformer[]) {
    const _medias: Record<string, any> = {}

    files.forEach(file => {
      const uuid = randomUUID()

      _medias[uuid] = {
        ...file,
        url: file.uri,
        original_url: file.uri,
        uuid,
        uploadProgress: 0.2,
      }
    })

    if (isMultiple) {
      setPreviews((prev) => ({
        ...prev,
        ..._medias,
      }))
    } else {
      setPreviews(_medias)
    }

    const failedMedias: Record<string, string[]> = {}

    const finalResults = await Promise.all(Object.values(_medias).map((media) => {
      return new Promise((resolve, reject) => {
        uploadMediaFile(media as UploadableMediaFile, (progress) => {
          setPreviews((prev) => ({
            ...prev,
            [media.uuid]: {
              ...media,
              uploadProgress: progress,
            },
          }))
        }).then((result) => {
          console.log('result::', JSON.stringify(result, null, 2))
          resolve({
            ...media,
            ...result,
            uploadProgress: 1
          })
        }).catch((error) => {
          console.log('error::', JSON.stringify(error, null, 2))
          failedMedias[media.uuid] = error?.errors?.file || []
        })
      })
    }))

    onChange?.(isMultiple ? finalResults : finalResults[0])

    if (Object.keys(failedMedias).length) {
      let errors: string[] = []
      Object.keys(failedMedias).forEach((uuid) => {
        onRemoveMedia(_medias[uuid])
        errors = [...errors, ...failedMedias[uuid]]
      })
      Alert.alert(
        'Oops!!',
        errors?.length ? errors.join(', ') : 'Failed to upload file',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  }

  /**
   * Launches the media picker to select files.
   *
   * @returns {Promise<void>} A promise that resolves when the media picker is closed.
   */
  async function launchMediaPicker() {
    actionRef.current?.close();

    let mediaTypes = MediaTypeOptions.All;

    if (type === 'image') {
      mediaTypes = MediaTypeOptions.Images;
    }

    const result = await launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: !isMultiple,
      quality: 0.8,
      allowsMultipleSelection: isMultiple,
    });

    if (result?.canceled) {
      return;
    }

    if (result.assets.length) {
      const files: Partial<UploadableMediaFile>[] = result.assets.map((file) => ({
        id: '',
        uri: file.uri,
        file_name: file.fileName || file.assetId || file.uri,
        file_type: file.type || type,
      }));
      onFilesSelected(files);
    }
  }

  /**
   * Launches the document picker to select files.
   * No permissions request is necessary for launching the image library.
   *
   * @returns {Promise<void>} A promise that resolves when the document picker is closed.
   */
  async function launchDocumentPicker() {
    // No permissions request is necessary for launching the image library
    actionRef.current?.close();

    const result = await getDocumentAsync({
      multiple: isMultiple,
    });

    if (result?.canceled) {
      return;
    }

    if (result.assets.length) {
      const files: Partial<UploadableMediaFile>[] = result.assets.map((file) => ({
        id: '',
        uri: file.uri,
        file_name: file.name,
        file_type: file.mimeType || type,
      }));
      onFilesSelected(files);
    }
  }

  /**
   * Launches the camera to capture a photo or record a video.
   *
   * @returns {Promise<void>} A promise that resolves when the camera is launched.
   */
  async function launchCamera() {
    actionRef.current?.close();

    let mediaTypes = MediaTypeOptions.All;

    if (type === 'image') {
      mediaTypes = MediaTypeOptions.Images;
    }

    try {
      // No permissions request is necessary for launching the image library
      const result = await launchCameraAsync({
        mediaTypes,
        allowsEditing: !isMultiple,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const files: Partial<UploadableMediaFile>[] = result.assets.map((file) => ({
          id: '',
          uri: file.uri,
          file_name: file.fileName || file.assetId || file.uri,
          file_type: file.type || type,
        }));
        onFilesSelected(files);
      }
    } catch (error: any) {
      Alert.alert(
        'Oops!!',
        error?.message || 'Failed to take photo',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }
  }

  /**
   * Opens the media picker based on the specified type.
   * If the type is 'documents', it launches the document picker.
   * If the platform is web, it launches the media picker.
   * Otherwise, it opens the action sheet using the ref.
   */
  function onOpenMediaPicker() {
    if (Platform.OS === 'web') {
      launchMediaPicker()
    } else {
      actionRef.current?.open();
    }
    return;
  }


  /**
   * Removes the specified media from the previews and deletes it using the MediaService.
   * @param media - The media to be removed.
   */
  function onRemoveMedia(media: MediaTransformer) {
    onChange?.(Object.values(previews).filter((preview) => preview.uuid !== media.uuid));
    MediaService.deleteMedia({
      requestBody: {
        uuid: media.uuid,
      }
    })
    setPreviews((prev) => {
      if (media.uuid) {
        const { [media.uuid]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  }

  return (
    <>
      {renderImagePicker()}
      <Previewer
        onPress={onOpenMediaPicker}
        previews={Object.values(previews)}
        onRemoveMedia={onRemoveMedia}
        placeholder={placeholder}
      />
    </>
  );
};

export default ZixMediaPickerField;
