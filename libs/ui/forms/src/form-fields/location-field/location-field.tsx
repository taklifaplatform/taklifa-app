import { useFieldInfo, useTsController } from '@ts-react/form';

import { LocateFixed, Pen } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { LocationService } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import { Button, Text, Theme, View, XStack, YStack } from 'tamagui';
import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common';
import { ZixInput } from '../../fields';
import ZixMapPointerField from '../../fields/zix-map-pointer-field/zix-map-pointer-field';

export type LocationFieldProps = {
  containerProps?: BaseFormFieldContainerProps;

  type?: 'advanced' | 'simple';
};

export const LocationField: React.FC<LocationFieldProps> = ({
  containerProps = {},
  type = 'simple',
  ...props
}) => {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();
  const { placeholder } = useFieldInfo();
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => value ? LocationService.retrieve({
      location: value,
    }) : { data: {} },
    queryKey: ['LocationService.retrieve', value],
  })

  const locationData = data?.data ?? {}

  const renderAddressCard = () =>
    (type === 'advanced' &&
      locationData?.address) ? (
      <YStack
        borderWidth="$0.5"
        borderColor="$color8"
        borderRadius="$4"
        padding="$2"
        gap="$2"
        height="$10"
        flex={1}
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap="$2">
            <Theme name="accent">
              <CustomIcon name="location" size="$1" color="$color9" />
            </Theme>
            <Text fontWeight="700">{locationData?.name ?? 'Home'}</Text>
          </XStack>

          <XStack alignItems="center" gap="$2">
            <View
              theme={locationData?.is_primary ? 'accent' : undefined}
              backgroundColor="$color4"
              paddingHorizontal="$4"
              paddingVertical="$2"
              borderRadius="$3"
            >
              <Text fontWeight="700">
                {locationData?.is_primary ? 'Primary' : 'Secondary'}
              </Text>
            </View>
            <Button size="$2" icon={Pen} />
          </XStack>
        </XStack>
        {locationData?.address && <Text>{locationData?.address}</Text>}

        {locationData?.phone_number && <Text>{locationData?.phone_number}</Text>}

        {/* <DebugObject object={value} /> */}
      </YStack>
    ) : null;

  const renderAddressMap = () =>
    (type === 'advanced' &&
      locationData?.latitude &&
      locationData?.longitude) ? (
      <View height="$12">
        <ZixMapPointerField value={locationData} />
      </View>
    ) : null;

  const renderInputActivator = () =>
    (type === 'simple' || !locationData?.address) && (
      <ZixInput
        rightIcon={(props) => <LocateFixed {...props} />}
        placeholder={placeholder}
        value={locationData?.address}
        height='$4'
      />
    );

  return (
    <FormFieldContainer {...containerProps} error={error}>
      <YStack gap="$4" position="relative">
        {renderAddressCard()}
        {renderAddressMap()}
        {renderInputActivator()}
        <View
          onPress={() => {
            if (!value) {
              LocationService.create({
                requestBody: {},
              }).then(({ data }) => {
                if (data?.id) {
                  onChange(data.id)
                  router.push(`/app/locations/${data.id}/edit`)
                }
              })
            } else {
              router.push(`/app/locations/${value}/edit`)
            }
          }}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
        />
      </YStack>
    </FormFieldContainer>
  );
};

export default LocationField;
