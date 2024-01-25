import { ImagePlus } from '@tamagui/lucide-icons';
import { useFieldInfo, useTsController } from '@ts-react/form';
import { Shake } from '@zix/app/ui/common';
import {
  Avatar,
  Fieldset,
  Image,
  InputProps,
  Label,
  Theme,
  XStack,
  YStack,
  useStyle,
  useThemeName
} from '@zix/app/ui/core';
import { IMediaFile } from '@zix/core/supabase';
import { ImageStyle } from 'expo-image';
import { useId } from 'react';
import { FieldError } from '../../common';
import { ZixMediaPickerField } from '../../fields';
export interface FileProps extends Pick<InputProps, 'size' | 'autoFocus'> {
  isMultiple?: boolean;
}

// this
export const AvatarField = (props: FileProps) => {
  const { field, error } = useTsController<IMediaFile>();
  const { label } = useFieldInfo();
  const themeName = useThemeName();
  const id = useId();

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
            onChange={({ file }) => field.onChange(file)}
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
                    {field.value?.uri ? (
                      <Image
                        source={{
                          uri: field.value?.uri
                        }}
                        alt="your avatar"
                        style={avatarStyle as ImageStyle}
                        resizeMode="cover"
                      />
                    ) : (
                      <ImagePlus size="$2" color="$color11" />
                    )}
                  </Avatar>

                  {!!label && (
                    <Label
                      textAlign="center"
                      size={props.size || '$3'}
                      htmlFor={id}
                    >
                      {label}
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
