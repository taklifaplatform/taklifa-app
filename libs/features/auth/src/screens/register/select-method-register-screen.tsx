import { useToastController } from '@tamagui/toast';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { FormWrapper } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'solito/router';
import {
  Separator,
  Text,
  XStack,
  YStack
} from 'tamagui';
import { AuthHeader } from '../../components/auth-header/auth-header';

export const SelectMethodRegisterScreen: React.FC = () => {
  useMixpanel('Select Method Register Page view');
  const router = useRouter();
  const {
    requestedAccountType,
    user,
    isLoggedIn,
  } = useAuth();
  const toast = useToastController();


  const renderMethodeRegister = ({
    icon,
    title,
  }: {
    icon: string;
    title: string;
  }) => {
    return (
      <ZixButton
        width="100%"
        height={50}
        gap="$2"
        backgroundColor="white"
        borderWidth={1}
        borderColor="black"
        borderRadius="$4"
        padding="$3"
        onPress={() => {
          onRedirectUser(icon);
        }}
      >
        <CustomIcon name={icon} size={24} color="black" />
        <Text fontSize={'$2'} fontWeight="bold">{title}</Text>
      </ZixButton>
    );
  };
  function onRedirectUser(method: string) {
    router.push('/auth/register/create-account?method=' + method);
    // if (isLoggedIn) {
    //   if (['email', 'phone'].includes(method)) {
    //     router.push('/auth/register/create-account?method=' + method);
    //   } else if (['google', 'apple'].includes(method)) {
    //     alert('TODO')
    //     // router.push('/auth/register/create-account');
    //   }
    // } else {
    //   router.push('/auth/register/create-account?method=' + method);
    // }

  }

  return (
    <ScreenLayout>
      <FormWrapper.Body>
        <AuthHeader
          showIcon={false}
          title="انشاء حساب جديد"
          canGoBack={true}
          onGoBack={() => router.back()}
        />
        <YStack gap="$4" marginHorizontal="$4" marginTop="$14" justifyContent="center" alignItems="center">
          {renderMethodeRegister({ icon: 'apple', title: 'سجّل الدخول باستخدام أبل' })}
          {renderMethodeRegister({
            icon: 'google',
            title: 'سجّل الدخول باستخدام جوجل',
          })}
          <XStack width="100%" gap="$1" justifyContent="center" alignItems="center" marginVertical="$4">
            <Separator backgroundColor="#DCDFE4" width="40%" />
            <Text fontSize={'$4'} fontWeight="bold" color="#DCDFE4">أو</Text>
            <Separator backgroundColor="#DCDFE4" width="40%" />
          </XStack>
          {renderMethodeRegister({ icon: 'phone', title: 'سجّل الدخول باستخدام هاتف' })}
          {renderMethodeRegister({
            icon: 'email',
            title: 'سجّل الدخول باستخدام بريد إلكتروني',
          })}
        </YStack>
      </FormWrapper.Body>
    </ScreenLayout>
  );
};

export default SelectMethodRegisterScreen;
