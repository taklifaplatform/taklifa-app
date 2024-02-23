import { Platform, UIManager } from 'react-native';

import { Camera, Image } from '@tamagui/lucide-icons';
import { ActionSheet, ActionSheetRef } from '@zix/app/ui/common';
import { getDocumentAsync } from 'expo-document-picker';
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync
} from 'expo-image-picker';
import { useRef } from 'react';
import { MediaTransformer } from '@zix/api';

export type ZixMediaPickerFieldProps = {
  // label?: string;
  // documentPickerOptions?: DocumentPickerOptions;
  // onChange?: (files: DocumentPickerResult) => Promise<void> | void;
  isMultiple?: boolean;
  onChange: ({
    files,
    file
  }: {
    files: MediaTransformer[];
    file: MediaTransformer;
  }) => Promise<void> | void;
  children: ({ onPress }: { onPress: () => void }) => React.ReactNode;
  type?: 'documents' | 'image' | 'video' | 'image-video';
};

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const ZixMediaPickerField: React.FC<ZixMediaPickerFieldProps> = ({
  onChange,
  isMultiple,
  type = 'image-video',
  children
}) => {
  const actionRef = useRef<ActionSheetRef>(null);

  const renderImagePicker = () => (
    <ActionSheet
      title="Add Media"
      actions={[
        {
          name: 'Take Photo',
          icon: <Camera size="$2" color="$color10" />,
          onPress: takePhoto
        },
        {
          name: 'Select Media',
          icon: <Image size="$2" color="$color10" />,
          onPress: pickMedia
        }
      ]}
      ref={actionRef}
    />
  );

  const pickMedia = async () => {
    // No permissions request is necessary for launching the image library
    actionRef.current?.close();

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: !isMultiple,
      // mediaTypes: 'All',
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: isMultiple
    });

    if (result?.canceled) {
      return;
    }

    if (result.assets.length) {
      const files: IMediaFile[] = result.assets.map((file) => ({
        id: '',
        uri: file.uri,
        file_name: file.fileName || file.assetId || file.uri,
        file_type: file.type || type
      }));
      onChange({
        files,
        file: files[0]
      });
    }
  };

  const pickDocument = async () => {
    // No permissions request is necessary for launching the image library
    actionRef.current?.close();

    const result = await getDocumentAsync({
      multiple: isMultiple
    });

    if (result?.canceled) {
      return;
    }

    if (result.assets.length) {
      const files: IMediaFile[] = result.assets.map((file) => ({
        id: '',
        uri: file.uri,
        file_name: file.name,
        file_type: file.mimeType || type
      }));
      onChange({
        files,
        file: files[0]
      });
    }
  };

  const takePhoto = async () => {
    actionRef.current?.close();

    // No permissions request is necessary for launching the image library
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: !isMultiple,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      const files: IMediaFile[] = result.assets.map((file) => ({
        id: '',
        uri: file.uri,
        file_name: file.fileName || file.assetId || file.uri,
        file_type: file.type || type
      }));
      onChange({
        files,
        file: files[0]
      });
    }
  };

  function onOpenMediaPicker() {
    if (type === 'documents') {
      return pickDocument();
    }
    if (Platform.OS === 'web') {
      //
    } else {
      actionRef.current?.open();
    }
    return;
  }

  return (
    <>
      {renderImagePicker()}
      {children({ onPress: onOpenMediaPicker })}
    </>
  );
};

export default ZixMediaPickerField;
