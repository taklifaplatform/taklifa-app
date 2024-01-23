import { useState } from 'react';
import { DocumentPickerResult } from 'expo-document-picker';
import {
  ZixMediaPickerField,
  ZixMediaPickerFieldProps
} from '../zix-media-picker-field/zix-media-picker-field';
import {
  ZixButton,
  ZixButtonProps,
  ListItem,
  Stack,
  XStack,
  StackPropsBase
} from '@zix/app/ui/core';

export type ZixFileFieldProps = {
  containerProps?: StackPropsBase;
  uploadButtonProps?: ZixButtonProps & {
    label?: string;
  };
  cancelButtonProps?: ZixButtonProps & {
    label?: string;
  };
  pickerButtonProps?: ZixMediaPickerFieldProps;
  onUpload: (files: DocumentPickerResult) => Promise<void> | void;
  directUpload?: boolean;
};

export const ZixFileField: React.FC<ZixFileFieldProps> = ({
  pickerButtonProps = { label: 'Pick File' },
  uploadButtonProps = { label: 'Upload' },
  onUpload,
  containerProps,
  directUpload,
  cancelButtonProps = { label: 'Cancel' }
}) => {
  const [result, setFiles] = useState<DocumentPickerResult | null>(null);
  const [isUploading, setUploading] = useState(false);
  const upload = async (res: DocumentPickerResult) => {
    setUploading(true);
    await onUpload(res);
    setUploading(false);
  };
  const selectedFileList = result?.output ?? [];
  return (
    <Stack {...containerProps}>
      {selectedFileList.length > 0 &&
        Array.from(selectedFileList).map((file: File) => (
          <ListItem
            title={file.name}
            subTitle={file.type}
            key={file.name + file.size}
          />
        ))}
      {result?.canceled === false ? (
        <XStack space={'$2'}>
          <ZixButton
            {...cancelButtonProps}
            onPress={() => {
              setFiles(null);
            }}
          >
            {cancelButtonProps?.label}
          </ZixButton>
          <ZixButton
            {...uploadButtonProps}
            loading={isUploading}
            onPress={() => upload(result)}
          >
            {uploadButtonProps.label}
          </ZixButton>
        </XStack>
      ) : (
        <ZixMediaPickerField
          {...pickerButtonProps}
          onChange={(files: any) => {
            if (directUpload) {
              return upload(files);
            } else {
              console.log({ files });
              setFiles(files);
            }
          }}
        />
      )}
    </Stack>
  );
};

export default ZixFileField;
