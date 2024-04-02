import { Text, XStack, YStack, Checkbox, Input, TextArea, Stack, Label } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';
export function PersonalInforma() {

    const renderSurname = () => (
        <Stack
            flexDirection='row'
            flexWrap='wrap'
            justifyContent='center'
            marginVertical="$10"
            $sm={{ marginVertical: 20 }}
        >
            <XStack
                marginLeft="$10"
                $sm={{ marginLeft: "$5" }}
                alignItems='center'
            >
                <Text fontSize={22} fontWeight="bold">اللقب</Text>
            </XStack>
            <XStack
                gap="$5"
                marginLeft="$8"
                $sm={{ marginLeft: "$5", gap: "$2" }}
                alignItems='center'
            >
                <Checkbox
                    borderRadius={0}
                    unstyled
                    borderColor="$color12"
                    borderWidth={1}
                    backgroundColor={0}
                    width={20}
                    height={20}
                    hoverStyle={{ borderColor: '$color12' }}
                >
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="السيد" fontSize={22} fontWeight="bold">السيد</Label>
            </XStack>
            <XStack
                gap="$5"
                marginLeft="$8"
                $sm={{ marginLeft: "$5", gap: "$2" }}
                alignItems='center'
            >
                <Checkbox
                    borderRadius={0}
                    unstyled
                    borderColor="$color12"
                    borderWidth={1}
                    backgroundColor={0}
                    width={20}
                    height={20}
                >
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="السيدة" fontSize={22} fontWeight="bold">السيدة</Label>
            </XStack>
            <XStack
                gap="$5"
                marginLeft="$8"
                $sm={{ marginLeft: "$5", gap: "$2" }}
                alignItems='center'
            >
                <Checkbox
                    borderRadius={0}
                    unstyled
                    borderColor="$color12"
                    borderWidth={1}
                    backgroundColor={0}
                    width={20}
                    height={20}
                >
                    <Checkbox.Indicator>
                        <Check />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor="الآنسة" fontSize={22} fontWeight="bold">الآنسة</Label>
            </XStack>
        </Stack>
    );
    const renderForme = () => (
        <Stack
            flexDirection='row'
            gap={20}
            flexWrap='wrap'
            justifyContent='flex-start'
        >
            {/* اسم العائلة */}
            <XStack gap="$7"
                justifyContent='flex-start'
                alignItems='center'
            >
                <Text fontSize={22} $sm={{ fontSize: 15 }} fontWeight='bold'> الاسم الأول</Text>
                <Input placeholder="ادخل الاسم الاول"
                    fontSize={20}
                    textAlign='right'
                    paddingRight={30}
                    borderColor="$color12"
                    backgroundColor={0}
                    height={60}
                    width={409}
                    $sm={{ width: 180, fontSize: 15, height: 50 }}
                />
            </XStack>
            <XStack gap="$7"
                justifyContent='flex-start'
                alignItems='center'
            >
                <Text fontSize={22} $sm={{ fontSize: 15 }} fontWeight='bold'> اسم العائلة</Text>
                <Input placeholder="ادخل اسم العائلة"
                    fontSize={20}
                    textAlign='right'
                    paddingRight={30}
                    borderColor="$color12"
                    backgroundColor={0}
                    height={60}
                    width={409}
                    $sm={{ width: 180, fontSize: 15, height: 50 }}
                />
            </XStack>
            {/* رقم الهاتف */}
            <XStack gap="$7"
                justifyContent='flex-start'
                alignItems='center'
            >
                <Text fontSize={22} $sm={{ fontSize: 15 }} fontWeight='bold'>  رقم الهاتف</Text>
                <Input placeholder="  ادخل رقم الهاتف"
                    fontSize={20}
                    textAlign='right'
                    paddingRight={30}
                    borderColor="$color12"
                    backgroundColor={0}
                    height={60}
                    width={409}
                    $sm={{ width: 180, fontSize: 15, height: 50 }}
                />
            </XStack>
            <XStack gap={80}
                justifyContent='flex-start'
                alignItems='center'
                $sm={{ gap: 67 }}
            >
                <Text fontSize={22} $sm={{ fontSize: 15 }} fontWeight='bold'>  الايميل</Text>
                <Input placeholder=" ادخل الايميل "
                    fontSize={20}
                    textAlign='right'
                    paddingRight={30}
                    borderColor="$color12"
                    backgroundColor={0}
                    height={60}
                    width={409}
                    $sm={{ width: 180, fontSize: 15, height: 50 }}
                />
            </XStack>
            {/* المنطقة */}
            <XStack gap={40}
                justifyContent='flex-start'
                alignItems='center'
                $sm={{ gap: 32 }}
            >
                <Text fontSize={22} $sm={{ fontSize: 15 }} fontWeight='bold' marginLeft="$5">  المنطقة</Text>
                <Input placeholder=" ادخل الايميل "
                    fontSize={20}
                    textAlign='right'
                    paddingRight={30}
                    borderColor="$color12"
                    backgroundColor={0}
                    height={60}
                    width={409}
                    $sm={{ width: 180, fontSize: 15, height: 50 }}
                />
            </XStack>
            <XStack gap={40}
                justifyContent='flex-start'
                alignItems='center'
            >
                <Text fontSize={22} $sm={{ fontSize: 15 }} fontWeight='bold'>   اختر الوكيل</Text>
                <Input placeholder=" اختار"
                    fontSize={20}
                    textAlign='right'
                    paddingRight={30}
                    borderColor="$color12"
                    backgroundColor={0}
                    height={60}
                    width={409}
                    $sm={{ width: 180, fontSize: 15, height: 50 }}
                />
            </XStack>
        </Stack>
    );
    const renderForme2 = () => (
        <>
            <Stack
                flexDirection='row'
                $sm={{ flexDirection: 'column', gap: "$5" }}
                flexWrap='wrap'
                justifyContent='flex-start'
                marginVertical="$8"
                alignItems='center'
            >
                <Text fontSize={25}
                    fontWeight="bold"
                    marginLeft="$8"
                    $sm={{ justifyContent: 'center', fontSize: 15, marginLeft: 0 }}
                >هل تود ان تبقى على اتصال بنا واستلام جميع عروضنا قي المستقبل</Text>
                <XStack
                    gap="$6"
                    justifyContent='center'
                    alignItems='center'
                >
                    <XStack
                        gap="$6"
                        $sm={{ gap: 3 }}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Checkbox
                            borderRadius={0}
                            unstyled
                            borderColor="$color12"
                            borderWidth={1}
                            backgroundColor={0}
                            width={20}
                            height={20}
                            hoverStyle={{ borderColor: '$color12' }}
                        >
                            <Checkbox.Indicator>
                                <Check />
                            </Checkbox.Indicator>
                        </Checkbox>
                        <Label htmlFor="نعم" fontSize={22} fontWeight="bold">نعم</Label>
                    </XStack>
                    <XStack
                        gap="$6"
                        $sm={{ gap: 3 }}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Checkbox
                            borderRadius={0}
                            unstyled
                            borderColor="$color12"
                            borderWidth={1}
                            backgroundColor={0}
                            width={20}
                            height={20}
                            hoverStyle={{ borderColor: '$color12' }}
                        >
                            <Checkbox.Indicator>
                                <Check />
                            </Checkbox.Indicator>
                        </Checkbox>
                        <Label htmlFor="نعم" fontSize={22} fontWeight="bold">لا</Label>
                    </XStack>
                </XStack>
            </Stack>
            {/* استفسارك */}
            <XStack
                justifyContent='flex-start'
                marginVertical="$8"
                gap="$6"
            >
                <Text fontSize={25} $sm={{ fontSize: 15 }} fontWeight='bold' marginTop='$3'>  استفسارك</Text>
                <TextArea
                    placeholder="املاء استفسار الخاص بك"
                    height={176}
                    width={1045}
                    $sm={{ width: 180, height: 100 }}
                    backgroundColor={0}
                    borderColor="$color12"
                    fontSize={22}
                    textAlign='right'
                />

            </XStack>
        </>
    );
    
    return (
        <YStack
            justifyContent='flex-start'
            alignItems='flex-start'
        >
           
            {renderForme()}
          
        </YStack>
    )
}