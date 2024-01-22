import { SolitoImage } from 'solito/image';

import { ImagePlus } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import { Shake } from '@zix/app/ui/common';
import {
  Avatar,
  Fieldset,
  InputProps,
  Label,
  Theme,
  XStack,
  YStack,
  useStyle,
  useThemeName
} from '@zix/app/ui/core';
import { useId } from 'react';
import { FieldError } from '../../common';
import { ZixMediaPickerField } from '../../fields';
export interface FileProps extends Pick<InputProps, 'size' | 'autoFocus'> {
  isMultiple?: boolean;
}

// this
export const AvatarField = (props: FileProps) => {
  const { field, error } = useTsController<string[]>();
  const { label } = useFieldInfo();
  const themeName = useThemeName();
  const id = useId();
  // const disabled = isSubmitting

  const avatarStyle = useStyle({
    width: '$7',
    height: '$7'
  });

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Fieldset>
        <Shake shakeKey={error?.errorMessage}>
          <ZixMediaPickerField
            type="image"
            onChange={(files: any) => {
              console.log('==============');
              console.log('files', JSON.stringify(files, null, 2));
              console.log('==============');
              field.onChange(files);
            }}
          >
            {({ onPress }) => (
              <XStack
                onPress={onPress}
                alignItems="center"
                justifyContent="center"
                padding="$3"
              >
                <YStack alignItems="center">
                  <Avatar
                    size="$7"
                    circular
                    backgroundColor="$gray6"
                    alignItems="center"
                    justifyContent="center"
                    {...props}
                  >
                    {field.value ? (
                      <SolitoImage
                        src={field.value?.uri || field.value}
                        alt="your avatar"
                        style={avatarStyle}
                        contentFit="cover"
                      />
                    ) : (
                      <ImagePlus size="$2" color="$color11" />
                    )}
                  </Avatar>

                  {!!label && (
                    <Label
                      textAlign="center"
                      theme="alt1"
                      size={props.size || '$3'}
                      htmlFor={id}
                    >
                      {label} ::{error?.errorMessage}
                    </Label>
                  )}
                </YStack>
              </XStack>
            )}
          </ZixMediaPickerField>
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};

export default AvatarField;
