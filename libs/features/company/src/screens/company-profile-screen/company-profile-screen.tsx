import { useQuery } from '@tanstack/react-query';
import { CompaniesService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { AccountSwitcher, AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { createParam } from 'solito';

import { useAuth, useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { useRouter } from 'solito/router';
import { ScrollView, Stack, Text, YStack } from 'tamagui';
import { CompanyCard } from '../../components';
import CompanyProfileTabs from '../../components/company-profile/company-profile-tabs/company-profile-tabs';

const { useParam } = createParam<{ company: string }>();

export function CompanyProfileScreen() {
  useMixpanel('Company Profile Screen view');
  const [companyId] = useParam('company');
  const router = useRouter();
  const {
    user: getUrlPrefix,
    canManageThisCompany,
    isAuthMemberInThisCompany,
  } = useAuth();

   const { data, refetch, isLoading, isError, error } = useQuery({
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

  const company = data?.data;
  
  

  const renderCompanyProfile = () =>
    company && (
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <YStack padding="$4" marginBottom="$4" gap="$4">
          <CompanyCard
            company={company}
            backgroundColor="$color2"
            showContactActions
            useShowButton={true}
          />
        </YStack>
        <CompanyProfileTabs company={company} />
      </ScrollView>
    );
  

  const renderLoadingSpinner = () =>
    !company?.id && !isError && <FullScreenSpinner />;

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
    ) : isAuthMemberInThisCompany(company?.id) || !company?.id ? (
      <AppHeader showBackButton headerTitle={() => <AccountSwitcher />} />
    ) : (
      <AppHeader
        showBackButton
        showCardHeader
        cardHeaderValue={'3.500'}
        title=""
      />
    );

  const renderError = () =>
    isError && (
      <Stack alignItems="center" justifyContent="center" flex={1} gap="$4">
        <CustomIcon name="empty_data" color="red" size={250} />
        <Text>{error?.message}</Text>
      </Stack>
    );

  return (
    <ScreenLayout>
      {renderHeader()}
      {renderLoadingSpinner()}
      {renderCompanyProfile()}
      {renderError()}
    </ScreenLayout>
  );
}

export default CompanyProfileScreen;
