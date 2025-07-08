import {
  Camera,
  Camera as CameraIcon,
  FileImage,
  Image,
  Images,
  Image as LucideImage,
  Paperclip,
} from '@tamagui/lucide-icons';
import { MediaService, MediaTransformer } from '@zix/api';
import {
  ActionSheet,
  ActionSheetRef,
  ZixButton,
  ZixDialog,
} from '@zix/ui/common';
import { randomUUID } from 'expo-crypto';
import { getDocumentAsync } from 'expo-document-picker';

import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { Dialog, Progress, Text, XStack, YStack } from 'tamagui';
import { UploadableMediaFile, uploadMediaFile } from '../../utils';
import { compressImage } from './compressImage';
import { useCamera } from './hooks/useCamera';
import {
  ZixFilesInputMediaPickerPreviewer,
  ZixImageMediaPickerPreviewer,
  ZixRowMediaPickerPreviewer,
} from './previewers';
import { ZixMediaPickerTransformer } from './types';

// Previewers specifications
export const MediaPreviewers = {
  image: ZixImageMediaPickerPreviewer,
  medias: ZixRowMediaPickerPreviewer,
  files: ZixFilesInputMediaPickerPreviewer,
  file: ZixFilesInputMediaPickerPreviewer,
};

export type ZixMediaPickerFieldProps = {
  type: 'medias' | 'image' | 'files' | 'file';
  notAvatar?: boolean;
  hasError?: boolean;
  isMultiple?: boolean;
  value?: MediaTransformer | MediaTransformer[];
  onChange: (
    value: MediaTransformer | MediaTransformer[],
  ) => Promise<void> | void;
  placeholder?: string;
  isOptional?: boolean;
  maxFileSize?: number;
  showCustomImagePicker?: boolean;
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
  showCustomImagePicker = false,
}) => {
  const Previewer = MediaPreviewers[type];
  const { permission, requestPermission } = useCamera();

  const actionRef = useRef<ActionSheetRef>(null);
  const [previews, setPreviews] = useState<
    Record<string | number, ZixMediaPickerTransformer>
  >({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      const _medias: Record<string, any> = {};
      files.forEach((file) => {
        if (file && file.uuid) {
          _medias[file.uuid] = file;
        } else if (file && file.id) {
          _medias[file.id] = file;
        }
      });
      setPreviews(_medias);
    }
  }, [value]);

  const renderImagePicker = () => {
    const actions = [
      {
        name: 'التقاط صورة',
        icon: <Camera size="$1.5" color="$color10" />,
        onPress: launchCamera,
      },
      {
        name: 'مكتبة الصور',
        icon: <Image size="$1.5" color="$color10" />,
        onPress: launchMediaPicker,
      },
    ];

    if (type === 'files' || type === 'file') {
      actions.push({
        name: 'اختيار الملفات',
        icon: <FileImage size="$1.5" color="$color10" />,
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
  const renderCustomImagePicker = () => {
    
    return (
      <ZixDialog
        title={'ارفع صور المنتج'}
        
        open={isOpen}
        onOpenChange={setIsOpen}
        contentPadding="$1"
        snapPoints={[30, 50]}
        disableRemoveScroll
        trigger={
          <ZixButton
            theme={'accent'}
            width={'$20'}
            height={'$4'}
            borderRadius={'$4'}
            backgroundColor="$color1"
            alignSelf="center"
            margin="$4"
          >
            <Text fontWeight="600" fontSize="$1" color="#FFFFFF">
              {' '}
              اختر الصور
            </Text>
          </ZixButton>
        }
      >
        <YStack alignItems="flex-start" gap="$5" padding="$6">
          <TouchableOpacity
            onPress={() => {
              setIsOpen(false);
              launchMediaPicker();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
          >
            <Images size={25} color="#000000" />
            <Text fontSize="$2" color="#000000" fontWeight="600">
              مكتبة الصور
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(false);
              launchCamera();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
          >
            <Camera size={25} color="#000000" />
            <Text fontSize="$2" color="#000000" fontWeight="600">
              التقاط صورة
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(false);
              launchDocumentPicker();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}
          >
            <FileImage size={25} color="#000000" />
            <Text fontSize="$2" color="#000000" fontWeight="600">
              اختيار الملفات
            </Text>
          </TouchableOpacity>
        </YStack>
      </ZixDialog>
    );
  };

  const [isUploading, setIsUploading] = useState(false);

  // Helper: Batched state update for previews
  const updatePreviews = (
    newMedias: Record<string, ZixMediaPickerTransformer>,
    isMultiple: boolean,
  ) => {
    setPreviews((prev) => {
      if (isMultiple) {
        return { ...prev, ...newMedias };
      } else {
        return { ...newMedias };
      }
    });
  };

  async function onFilesSelected(files: ZixMediaPickerTransformer[]) {
    if (!files || !files.length) return;
    const _medias: Record<string, ZixMediaPickerTransformer> = {};
    files.forEach((file) => {
      if (file && file.uuid) {
        _medias[file.uuid] = { ...file, uploadProgress: 0.2 };
      }
    });
    updatePreviews(_medias, !!isMultiple);

    const failedMedias: Record<string, string[]> = {};
    setIsUploading(true);
    let finalResults: ZixMediaPickerTransformer[] = [];
    try {
      finalResults = await Promise.all(
        Object.values(_medias).map(async (_media) => {
          try {
            const resizedPhoto = await compressImage(_media);
            const media = { ..._media, ...resizedPhoto };
            return await new Promise<ZixMediaPickerTransformer>(
              (resolve, reject) => {
                uploadMediaFile(media as UploadableMediaFile, (progress) => {
                  setPreviews((prev) => ({
                    ...prev,
                    ...(media.uuid
                      ? {
                          [media.uuid]: {
                            ...media,
                            uploadProgress: progress,
                          },
                        }
                      : {}),
                  }));
                })
                  .then((result) => {
                    resolve({ ...media, ...result, uploadProgress: 1 });
                  })
                  .catch((error: any) => {
                    captureError(error);
                    if (_media.uuid) {
                      failedMedias[_media.uuid] = error?.errors?.file || [
                        error?.message || 'Unknown error',
                      ];
                    }
                    reject(error);
                  });
              },
            );
          } catch (error: any) {
            captureError(error);
            if (_media.uuid) {
              failedMedias[_media.uuid] = [error?.message || 'Unknown error'];
            }
            throw error;
          }
        }),
      );
    } catch (e) {
      // Already handled per-file
    }
    onChange?.(isMultiple ? finalResults : finalResults[0]);
    if (Object.keys(failedMedias).length) {
      let errors: string[] = [];
      Object.keys(failedMedias).forEach((uuid) => {
        if (_medias[uuid]) {
          onRemoveMedia(_medias[uuid]);
        }
        if (failedMedias[uuid]) {
          errors = [...errors, ...failedMedias[uuid]];
        }
      });
      showAlert(
        'Oops!!',
        errors.length ? errors.join(', ') : 'Failed to upload file',
      );
    }
    setIsUploading(false);
  }

  // Helper: Safe alert
  function showAlert(title: string, message: string) {
    try {
      Alert.alert(title, message, [{ text: 'OK', style: 'cancel' }], {
        cancelable: true,
      });
    } catch (e) {
      // fallback: log if Alert fails
      console.error('Alert failed:', e, title, message);
    }
  }

  function captureError(error: any) {
    console.error('Error capture failed:', error);
  }

  // Helper: Convert picked files to ZixMediaPickerTransformer with required fields
  function normalizePickedFiles(
    files: any[],
    type: string,
    mediaTypes?: any,
  ): ZixMediaPickerTransformer[] {
    return files.map((file) => ({
      ...file,
      url: file.uri,
      original_url: file.uri,
      uuid: randomUUID(),
      uploadProgress: 0,
      id: typeof file.id === 'number' ? file.id : undefined,
      file_name: file.fileName || file.assetId || file.name || file.uri,
      file_type: file.type || file.mimeType || type,
      mediaTypes: mediaTypes || undefined,
    }));
  }

  async function launchMediaPicker() {
    actionRef.current?.close();
    const mediaTypes = MediaTypeOptions.Images;
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes,
        allowsEditing: !isMultiple,
        quality: 0.8,
        allowsMultipleSelection: isMultiple,
      });
      if (result?.canceled) return;
      if (result.assets.length) {
        if (
          maxFileSize &&
          result.assets.some((asset) => (asset.fileSize ?? 0) > maxFileSize)
        ) {
          showAlert(
            'Oops!!',
            `File size should not exceed ${maxFileSize / 1024 / 1024} MB`,
          );
          return;
        }
        const files = normalizePickedFiles(result.assets, type, mediaTypes);
        onFilesSelected(files);
      }
    } catch (error: any) {
      captureError(error);
      showAlert('Oops!!', error?.message || 'Failed to pick media');
    }
  }

  async function launchDocumentPicker() {
    actionRef.current?.close();
    try {
      const result = await getDocumentAsync({
        multiple: isMultiple,
        type: ['image/*'],
      });
      if (result?.canceled) return;
      if (result.assets.length) {
        const files = normalizePickedFiles(result.assets, type);
        onFilesSelected(files);
      }
    } catch (error: any) {
      captureError(error);
      showAlert('Oops!!', error?.message || 'Failed to pick document');
    }
  }

  async function launchCamera() {
    try {
      if (
        !permission ||
        typeof permission !== 'object' ||
        !('granted' in permission) ||
        !(permission as any).granted
      ) {
        let grant;
        if (typeof requestPermission === 'function') {
          grant = await requestPermission();
        }
        if (
          typeof grant !== 'object' ||
          !('granted' in grant) ||
          !(grant as any).granted
        ) {
          showAlert('Oops!!', 'Camera permission is required to take photo');
          return;
        }
      }
      actionRef.current?.close();
      const mediaTypes = MediaTypeOptions.Images;
      const result = await launchCameraAsync({
        mediaTypes,
        allowsEditing: !isMultiple,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets.length) {
        const files = normalizePickedFiles(result.assets, type, mediaTypes);
        onFilesSelected(files);
      }
    } catch (error: any) {
      captureError(error);
      showAlert('Oops!!', error?.message || 'Failed to take photo');
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
      onChange?.(null as any); // type fix
      setPreviews({});
    } else {
      onChange?.(
        Object.values(previews).filter(
          (preview) =>
            (!media.uuid || preview.uuid !== media.uuid) &&
            (!media.id || preview.id !== media.id),
        ),
      );
      if (media.uuid) {
        try {
          MediaService.deleteMedia({ requestBody: { uuid: media.uuid } });
        } catch (e) {
          captureError(e);
        }
      }
      setPreviews((prev) => {
        const _new = { ...prev };
        if (media.uuid && _new[media.uuid]) delete _new[media.uuid];
        else if (media.id && _new[media.id]) delete _new[media.id];
        return _new;
      });
    }
  }

  const renderUploadProgressDialog = () => {
    const totalFiles = Object.keys(previews).length;
    const uploadedFiles = Object.values(previews).filter(
      (file) => file.uploadProgress === 1,
    ).length;
    let progress = 0;
    try {
      // Use integer arithmetic to avoid precision loss
      progress = totalFiles > 0 ? Math.round((uploadedFiles * 100) / totalFiles) : 0;
    } catch (error) {
      console.log('error', error);
    }

    // progress = Number(progress.toFixed(2));
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
            // animation={[
            //   'quick',
            //   {
            //     opacity: {
            //       overshootClamping: true,
            //     },
            //   },
            // ]}
            // enterStyle={{ x: 0, y: 20, opacity: 0, scale: 0.9 }}
            // exitStyle={{ x: 0, y: 20, opacity: 0, scale: 0.9 }}
            gap="$4"
            width="100%"
          >
            <Dialog.Title>
              {t('core:media_picker.uploading_title')}
            </Dialog.Title>
            <Dialog.Description>
              {t('core:media_picker.uploading_progress', {
                uploaded: uploadedFiles.toString(),
                total: totalFiles.toString(),
              })
                ?.replace('{uploaded}', uploadedFiles.toString())
                .replace('{total}', totalFiles.toString())}
            </Dialog.Description>
            <XStack space="$4" alignItems="center" width="100%">
              <Progress value={progress} width="100%" size="$4">
                <Progress.Indicator animation="bouncy" />
              </Progress>
              <Text>{progress}%</Text>
            </XStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    );
  };

  return (
    <>
      {!showCustomImagePicker && (
        <Previewer
          onPress={onOpenMediaPicker}
          previews={Object.values(previews)}
          onRemoveMedia={onRemoveMedia}
          placeholder={placeholder}
          isOptional={isOptional} //
          notAvatar={notAvatar}
        />
      )}
      {showCustomImagePicker && renderCustomImagePicker()}

      {!showCustomImagePicker && renderImagePicker()}
      { renderUploadProgressDialog()}
    </>
  );
};

export default ZixMediaPickerField;
