import { Camera as CameraIcon, Image as LucideImage, Paperclip } from '@tamagui/lucide-icons';
import { MediaService, MediaTransformer } from '@zix/api';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { randomUUID } from 'expo-crypto';
import { getDocumentAsync } from 'expo-document-picker';

import * as Sentry from "@sentry/react-native";
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { Dialog, Progress, Text, XStack } from 'tamagui';
import { UploadableMediaFile, uploadMediaFile } from '../../utils';
import { compressImage } from './compressImage';
import { useCamera } from './hooks/useCamera';
import { ZixFilesInputMediaPickerPreviewer, ZixImageMediaPickerPreviewer, ZixRowMediaPickerPreviewer } from './previewers';
import { ZixMediaPickerTransformer } from './types';

// Previewers specifications
export const MediaPreviewers = {
  image: ZixImageMediaPickerPreviewer,
  medias: ZixRowMediaPickerPreviewer,
  files: ZixFilesInputMediaPickerPreviewer,
  file: ZixFilesInputMediaPickerPreviewer,
}

export type ZixMediaPickerFieldProps = {
  type: 'medias' | 'image' | 'files' | 'file';
  notAvatar?: boolean;
  hasError?: boolean;
  isMultiple?: boolean;
  value?: MediaTransformer | MediaTransformer[];
  onChange: (value: MediaTransformer | MediaTransformer[]) => Promise<void> | void;
  placeholder?: string;
  isOptional?: boolean;
  maxFileSize?: number;
};

export const ZixMediaPickerField: React.FC<ZixMediaPickerFieldProps> = ({
  isMultiple,
  type = 'medias',
  onChange,
  value,
  placeholder,
  isOptional,
  maxFileSize = 10 * 1024 * 1024,
  notAvatar,
}) => {
  const Previewer = MediaPreviewers[type];
  const { permission, requestPermission } = useCamera();

  const actionRef = useRef<ActionSheetRef>(null);
  const [previews, setPreviews] = useState<Record<string | number, ZixMediaPickerTransformer>>({});

  useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      const _medias: Record<string, any> = {};
      files.forEach(file => {
        if (file.uuid) {
          _medias[file.uuid] = file;
        } else {
          _medias[file.id] = file;
        }
      });
      setPreviews(_medias);
    }
  }, [value]);

  const renderImagePicker = () => {
    const actions = [
      {
        name: t(`core:media_picker.camera`),
        icon: <CameraIcon size="$1.5" color="$color10" />,
        onPress: launchCamera,
      },
      {
        name: t(`core:media_picker.select_media`),
        icon: <LucideImage size="$1.5" color="$color10" />,
        onPress: launchMediaPicker,
      },
    ];

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
    );
  };

  const [isUploading, setIsUploading] = useState(false);

  async function onFilesSelected(files: ZixMediaPickerTransformer[]) {
    const _medias: Record<string, any> = {};

    files.forEach(file => {
      const uuid = randomUUID();
      _medias[uuid] = {
        ...file,
        url: file.uri,
        original_url: file.uri,
        uuid,
        uploadProgress: 0.2,
      };
    });

    if (isMultiple) {
      setPreviews((prev) => ({
        ...prev,
        ..._medias,
      }));
    } else {
      setPreviews(_medias);
    }

    const failedMedias: Record<string, string[]> = {};
    console.log('===============')
    console.log('UPLOADING FILES::', _medias)
    console.log('===============')
    setIsUploading(true);
    const finalResults = await Promise.all(Object.values(_medias).map(async (_media) => {
      const resizedPhoto = await compressImage(_media);
      // console.log('resizedPhoto::', resizedPhoto)
      const media = {
        ..._media,
        ...resizedPhoto
      }
      return new Promise((resolve, reject) => {
        // compress the image
        uploadMediaFile(media as UploadableMediaFile, (progress) => {
          console.log('===============')
          console.log('uploadMediaFil>progress::', progress)
          console.log('===============')
          // setPreviews((prev) => ({
          //   ...prev,
          //   [media.uuid]: {
          //     ...media,
          //     uploadProgress: progress,
          //   },
          // }));
        }).then((result) => {
          console.log('===============')
          console.log('uploadMediaFil>result::', result)
          console.log('===============')
          resolve({
            ...media,
            ...result,
            uploadProgress: 1,
          });
        }).catch((error) => {
          Sentry.captureException(error);
          failedMedias[media.uuid] = error?.errors?.file || [];
          reject(error);
        });
      });
    }));
    console.log('===============')
    console.log('FINAL RESULTS::', finalResults)
    console.log('===============')

    onChange?.(isMultiple ? finalResults : finalResults[0]);

    if (Object.keys(failedMedias).length) {
      let errors: string[] = [];
      Object.keys(failedMedias).forEach((uuid) => {
        onRemoveMedia(_medias[uuid]);
        errors = [...errors, ...failedMedias[uuid]];
      });
      Alert.alert(
        'Oops!!',
        errors.length ? errors.join(', ') : 'Failed to upload file',
        [{ text: 'OK', style: 'cancel' }],
        { cancelable: true }
      );
    }
    setIsUploading(false);
  }

  async function launchMediaPicker() {
    actionRef.current?.close();
    const mediaTypes = MediaTypeOptions.Images;

    const result = await launchImageLibraryAsync({
      mediaTypes,
      allowsEditing: !isMultiple,
      quality: 0.8,
      allowsMultipleSelection: isMultiple,
    });
    // TODO: compress mages
    if (result?.canceled) return;
    if (result.assets.length) {
      if (maxFileSize && result.assets.filter((asset) => asset.fileSize > maxFileSize).length) {
        Alert.alert(
          'Oops!!',
          `File size should not exceed ${maxFileSize / 1024 / 1024} MB`,
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
        return;
      }
      const files: Partial<UploadableMediaFile>[] = result.assets.map((file) => ({
        ...file,
        mediaTypes,
        id: '',
        uri: file.uri,
        file_name: file.fileName || file.assetId || file.uri,
        file_type: file.type || type,
      }));
      onFilesSelected(files);
    }
  }

  async function launchDocumentPicker() {
    actionRef.current?.close();
    const result = await getDocumentAsync({
      multiple: isMultiple,
      type: ['image/*',],
      // type: ['image/*', 'application/pdf'],
    });
    if (result?.canceled) return;
    if (result.assets.length) {
      const files = result.assets.map((file) => ({
        ...file,
        id: '',
        uri: file.uri,
        file_name: file.name,
        file_type: file.mimeType || type,
      }));
      onFilesSelected(files);
    }
  }

  async function launchCamera() {
    if (!permission?.granted) {
      const grant = await requestPermission();
      if (!grant.granted) {
        Alert.alert(
          'Oops!!',
          'Camera permission is required to take photo',
          
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
          { cancelable: true }
        );
        return;
      }
    }

    actionRef.current?.close();
    const mediaTypes = MediaTypeOptions.Images;

    try {
      const result = await launchCameraAsync({
        mediaTypes,
        allowsEditing: !isMultiple,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const files = result.assets.map((file) => ({
          id: '',
          uri: file.uri,
          file_name: file.fileName || file.assetId || file.uri,
          file_type: file.type || type,
        }));
        onFilesSelected(files);
      }
    } catch (error: any) {
      Sentry.captureException(error);
      Alert.alert('Oops!!', error?.message || 'Failed to take photo', [
        { text: 'OK', style: 'cancel' },
      ]);
    }
  }

  function onOpenMediaPicker() {
    if (Platform.OS === 'web') {
      launchMediaPicker();
    } else {
      actionRef.current?.open();
    }
  }

  function onRemoveMedia(media: MediaTransformer) {
    if (type === 'file') {
      onChange?.(null);
      setPreviews({});
    } else {
      onChange?.(
        Object.values(previews).filter(
          (preview) =>
            (!media.uuid || preview.uuid !== media.uuid) &&
            (!media.id || preview.id !== media.id)
        )
      );
      if (media.uuid) {
        MediaService.deleteMedia(media.uuid);
      }
      setPreviews((prev) => {
        const _new = { ...prev };
        delete _new[media.uuid || media.id];
        return _new;
      });
    }

  }

  const renderUploadProgressDialog = () => {
    const totalFiles = Object.keys(previews).length;
    const uploadedFiles = Object.values(previews).filter(file => file.uploadProgress === 1).length;
    const progress = totalFiles > 0 ? (uploadedFiles / totalFiles) * 100 : 0;

    return (
      <Dialog open={isUploading} modal>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: 20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 20, opacity: 0, scale: 0.9 }}
            gap="$4"
            width="90%"
          >
            <Dialog.Title>{t('core:media_picker.uploading_title')}</Dialog.Title>
            <Dialog.Description>
              {t('core:media_picker.uploading_progress', {
                uploaded: uploadedFiles,
                total: totalFiles
              }).replace('{uploaded}', uploadedFiles).replace('{total}', totalFiles)}
            </Dialog.Description>
            <XStack space="$4" alignItems="center">
              <Progress value={progress} width="100%" size="$4">
                <Progress.Indicator animation="bouncy" />
              </Progress>
              <Text>{Math.round(progress)}%</Text>
            </XStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    );
  };

  return (
    <>
      <Previewer
        onPress={onOpenMediaPicker}
        previews={Object.values(previews)}
        onRemoveMedia={onRemoveMedia}
        placeholder={placeholder}
        isOptional={isOptional} //
        notAvatar={notAvatar}
      />
      {renderImagePicker()}
      {renderUploadProgressDialog()}
    </>
  );
};

export default ZixMediaPickerField;
