
import { useQuery } from '@tanstack/react-query';
import { CompaniesService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { AccountSwitcher, AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { createParam } from 'solito';

import { useAuth, useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import { ScrollView, YStack } from 'tamagui';
import CompanyContactActions from '../../components/company-profile/company-contact-actions/company-contact-actions';
import CompanyInfoRow from '../../components/company-profile/company-info-row/company-info-row';
import CompanyProfileHeader from '../../components/company-profile/company-profile-header/company-profile-header';
import CompanyProfileTabs from '../../components/company-profile/company-profile-tabs/company-profile-tabs';

const { useParam } = createParam<{ company: string }>();

export function CompanyProfileScreen() {
  useMixpanel('Company Profile Screen view')
  const [companyId] = useParam('company');
  const router = useRouter();
  const { user: authUser, getUrlPrefix, canManageThisCompany, isAuthMemberInThisCompany } = useAuth();


  const { data, refetch, isLoading } = useQuery({
    queryFn() {
      if (!companyId) {
        return;
      }

      return CompaniesService.retrieveCompany({
        company: companyId,
      });
    },
    queryKey: ['CompaniesService.retrieveCompany', companyId],
  });

  const renderCompanyProfile = () => data?.data && (
    <ScrollView flex={1} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}>
      <YStack padding="$4" marginBottom='$4' gap="$4">
        <YStack
          backgroundColor='$color2'
          borderRadius='$5'
          paddingHorizontal='$4'
          paddingBottom='$4'
          gap='$6'
        >
          <CompanyProfileHeader company={data.data} />
          <CompanyInfoRow company={data.data} />
        </YStack>
        {!authUser?.companies?.find(c => c.id === company?.id) && <CompanyContactActions company={data.data} />}
      </YStack>
      <CompanyProfileTabs company={data.data} />
    </ScrollView>
  )
  const company = data?.data;
  //
  const renderLoadingSpinner = () => !company?.id && <FullScreenSpinner />;

  const renderHeader = () =>
    canManageThisCompany(company?.id) ? ( //
      <AppHeader
        showBackButton
        headerTitle={() => <AccountSwitcher />}
        headerRight={() => (
          <TouchableOpacity
            style={{
              borderRadius: 4,
              padding: 5,
            }}
            onPress={() => router.push(`${getUrlPrefix}/account/settings`)}
          >
            <CustomIcon name="more" color="black" size="$3" />
          </TouchableOpacity>
        )}
      />
    ) : isAuthMemberInThisCompany(company?.id) ? (
      <AppHeader
        showBackButton
        headerTitle={() => <AccountSwitcher />}
      />
    ) : (
      <AppHeader
        showBackButton
        title={company?.name ?? '...'}
      />
    );


  return (
    <ScreenLayout>
      {renderHeader()}
      {renderLoadingSpinner()}
      {renderCompanyProfile()}
    </ScreenLayout>
  );
}


export default CompanyProfileScreen;
