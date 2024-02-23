import { PlusSquare } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import { MediaTransformer } from '@zix/api';
import { Shake } from '@zix/app/ui/common';
import {
  Fieldset,
  InputProps,
  Label,
  Text,
  Theme,
  XStack,
  useThemeName
} from '@zix/app/ui/core';
import { useUser } from '@zix/core/auth';
import { useId, useMemo } from 'react';
import { FieldError } from '../../common';
import { ZixMediaPickerField } from '../../fields';
export interface FileProps extends Pick<InputProps, 'size' | 'autoFocus'> {
  isMultiple?: boolean;
}

//
export const FileField = (props: FileProps) => {
  const { user } = useUser()
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

  async function handleFileChange(files: MediaTransformer[]) {
    const uploadedFiles = await Promise.all(
      files.map((file) => {
        alert('handled FileField')
        // uploadMediaFile({
        //   file,
        //   bucket: 'uploads',
        //   path: `${user.id}/files/${file.file_name}`
        // })
      }

      )
    );
    // field.onChange(uploadedFiles);
    // for (const file of files) {

    //   const data = await uploadMediaFile({
    //     file,
    //     bucket: 'uploads',
    //     path: `${user.id}/files/${file.file_name}`
    //   });
    //   console.log('=========')
    //   console.log('handleFileChange::', JSON.stringify({ data, file }, null, 2));
    //   console.log('=========')
    // }
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
