import { useAuth, useMixpanel } from '@zix/services/auth';
import { FormWrapper } from '@zix/ui/forms';
import { ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';
import SignInLink from '../../components/signin-link/signin-link';

/**
 * Represents the screen for selecting the account type during the registration process.
 * Allows the user to choose between service requestor and service provider account types.
 */
export const SelectAccountTypeScreen: React.FC = () => {
  useMixpanel('Select Account Type Page view')
  const router = useRouter();
  const { requestedAccountType, setRequestedAccountType, user} = useAuth();

  function onRedirectUser() {
    router.push('/auth/register/select-method-register');
  }

  return (
    <ScreenLayout>
      <FormWrapper.Body>
        <AuthHeader
          iconName="logo"
          title='مرحبــــا بك فــــي'
        />

        <YStack gap="$4" marginHorizontal="$4" marginTop="$10">
          {!user?.roles?.find((role) => role.name === 'customer') && (
            <InlineItemSelect
              icon="user_type_customer"
              title='عميل تكلفة'
              subTitle='تسجيل مستخدم'
              value="customer"
              selectedValue={requestedAccountType}
              onSelect={(value) => {
                setRequestedAccountType(value);
                onRedirectUser();
              }}
            />
          )}
          {!user?.roles?.find((role) => role.name === 'solo_driver') && (
            <InlineItemSelect
              icon="user_type_solo_transporter"
              title='تقدم خدمة'
              subTitle='( يمكنك عرض خدماتك في قسم الخدمات )'
              value="solo_driver"
              selectedValue={requestedAccountType}
              onSelect={(value) => {
                setRequestedAccountType(value);
                onRedirectUser();
              }}
            />
          )}
          <InlineItemSelect
            icon="user_type_company"
            title='تبيع منتج'
            subTitle='يمكنك إنشاء متجرك وعرض منتجاتك للبيع على الخريطة'
            value="company_owner"
            selectedValue={requestedAccountType}
            onSelect={(value) => {
              setRequestedAccountType(value);
              onRedirectUser();
            }}
          />
        </YStack>
      </FormWrapper.Body>
      <SignInLink />
    </ScreenLayout>
  );
};

export default SelectAccountTypeScreen;
