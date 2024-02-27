import { PlusSquare } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import { MediaTransformer } from '@zix/api';
import { Shake } from '@zix/ui/common';
import { useId, useMemo, useState } from 'react';
import { randomUUID } from 'expo-crypto'

import {
  Fieldset,
  InputProps,
  Label,
  Text,
  Theme,
  XStack,
  useThemeName,
} from 'tamagui';
import { FieldError } from '../../common';
import { ZixMediaPickerField } from '../../fields';
import { uploadMediaFile } from '../../utils';

export interface FileProps extends Pick<InputProps, 'size' | 'autoFocus'> {
  isMultiple?: boolean;
}

//
export const FileField = (props: FileProps) => {
  const { field, error } = useTsController<MediaTransformer[]>();
  const { label, placeholder } = useFieldInfo();
  const themeName = useThemeName();
  const id = useId();
  // const disabled = isSubmitting

  const inputText = useMemo(() => {
    if (!props.isMultiple) {
      return field.value ? `1 Document Updated` : placeholder;
    }
    return field.value?.length
      ? `${field.value?.length} Document Updated`
      : placeholder;
  }, [field.value, props.isMultiple, placeholder]);

  const [files, setFiles] = useState<MediaTransformer[]>(field.value || [])
  const [uploadingFileStatus, setUploadingFileStatus] = useState<Record<string, boolean>>({})


  async function onAddMedia(media: any): Promise<MediaTransformer> {
    const uuid = randomUUID()
    setFiles((prev: any[]) => [
      ...prev,
      {
        uuid,
        url: media.uri,
        original_url: media.uri,
      },
    ])
    setUploadingFileStatus((prev) => ({ ...prev, [uuid]: true }))
    const uploadedMedia = await uploadMediaFile(media)
    setUploadingFileStatus((prev) => ({ ...prev, [uuid]: false }))
    return uploadedMedia
  }
  async function handleFileChange(files: MediaTransformer[]) {
    const uploadedMedias = await Promise.all(files.map(onAddMedia))
    if (uploadedMedias?.length) {
      if (props.isMultiple) {
        field.onChange([...(field.value || []), ...uploadedMedias])
      } else {
        field.onChange(uploadedMedias[0])

      }
    }
    // field.onChange([...(field.value || []), ...uploadedMedias])
    console.log('===========')
    console.log('uploadedMedias::', JSON.stringify(uploadedMedias, null, 2))
    console.log('===========')
  }

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset>
        {!!label && (
          <Label textAlign="left" size={props.size || '$3'} htmlFor={id}>
            {label}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <ZixMediaPickerField
            type="documents"
            onChange={({ files }) => handleFileChange(files)}
            isMultiple={props.isMultiple}
          >
            {({ onPress }) => (
              <XStack
                onPress={onPress}
                height={props.size || '$5'}
                alignItems="center"
                justifyContent="space-between"
                padding="$3"
                borderWidth="$0.25"
                borderColor="$color10"
                borderRadius="$5"
                backgroundColor="$color2"
              >
                <Text fontSize="$3" color="$gray11" flex={1} numberOfLines={1}>
                  {inputText}
                </Text>

                <PlusSquare size="$1.5" color="$color11" />
              </XStack>
            )}
          </ZixMediaPickerField>
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};

export default FileField;
