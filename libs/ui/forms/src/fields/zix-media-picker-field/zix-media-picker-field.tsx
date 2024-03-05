import { randomUUID } from 'expo-crypto';

import { Alert, Platform, Text } from 'react-native';

import { Camera, Image } from '@tamagui/lucide-icons';
import { MediaService, MediaTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { getDocumentAsync } from 'expo-document-picker';
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';
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
      files.forEach((file) => {
        if (file.uuid) {
          setPreviews((prev) => ({
            ...prev,
            [file.uuid]: file as ZixMediaPickerTransformer,
          }));
        } else if (file.id) {
          setPreviews((prev) => ({
            ...prev,
            [file.id]: file as ZixMediaPickerTransformer,
          }));
        }
      });
    }
  }, [value]);

  const renderImagePicker = () => (
    <ActionSheet
      title="Add Media"
      actions={[
        {
          name: 'Take Photo',
          icon: <Camera size="$2" color="$color10" />,
          onPress: launchCamera,
        },
        {
          name: 'Select Media',
          icon: <Image size="$2" color="$color10" />,
          onPress: launchMediaPicker,
        },
      ]}
      ref={actionRef}
    />
  );

  /**
   * Handles the selection of files in the media picker.
   * @param files The selected files.
   */
  function onFilesSelected(files: ZixMediaPickerTransformer[]) {
    files.forEach((file) => {
      const uuid = randomUUID()
      const media = {
        ...file,
        url: file.uri,
        original_url: file.uri,
        uuid,
        uploadProgress: 0.2,
      }
      if (isMultiple) {
        setPreviews((prev) => ({
          ...prev,
          [uuid]: media,
        }))
      } else {
        setPreviews({
          [uuid]: media,
        })
      }
      uploadMediaFile(media as UploadableMediaFile, (progress) => {
        setPreviews((prev) => ({
          ...prev,
          [uuid]: {
            ...media,
            uploadProgress: progress,
          },
        }))
      })
        .then((result) => {
          setPreviews((prev) => ({
            ...prev,
            [uuid]: {
              ...media,
              ...result,
              uploadProgress: 1
            },
          }))
          onChange?.(isMultiple ? [
            ...files,
            result,
          ] : result)
        })
        .catch((error) => {
          alert('Oops, Failed to upload file. Please try again later!!')
        })
    })
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
    if (type === 'files' || type === 'file') {
      return launchDocumentPicker();
    }
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
      {/* <Text>{JSON.stringify(value)}</Text> */}
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
