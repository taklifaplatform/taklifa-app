
import { useQuery } from '@tanstack/react-query';
import { CompaniesService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { AccountSwitcher, AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { createParam } from 'solito';

import { ScrollView, YStack } from 'tamagui';
import CompanyInfoRow from '../../components/company-profile/company-info-row/company-info-row';
import CompanyProfileHeader from '../../components/company-profile/company-profile-header/company-profile-header';
import CompanyContactActions from '../../components/company-profile/company-contact-actions/company-contact-actions';
import CompanyProfileTabs from '../../components/company-profile/company-profile-tabs/company-profile-tabs';
import { useAuth } from '@zix/services/auth';
import { useRouter } from 'solito/router';
import { CustomIcon } from '@zix/ui/icons';

const { useParam } = createParam<{ company: string }>();

export function CompanyProfileScreen() {
  const [companyId] = useParam('company');
  const router = useRouter();
  const { user: authUser, getUrlPrefix } = useAuth();


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
        <CompanyContactActions company={data.data} />
      </YStack>
      <CompanyProfileTabs company={data.data} />
    </ScrollView>
  )
  const company = data?.data;
  //
  const renderLoadingSpinner = () => !company?.id && <FullScreenSpinner />;

  const renderHeader = () =>
    authUser?.companies?.find(c => c.id === company?.id) ? (
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
    ) : (
      <AppHeader
        showBackButton
        title={company?.name ?? '...'}
      />
    );


  return (
    <ScreenLayout authProtected>
      {renderHeader()}
      {renderLoadingSpinner()}
      {renderCompanyProfile()}
    </ScreenLayout>
  );
}


export default CompanyProfileScreen;
