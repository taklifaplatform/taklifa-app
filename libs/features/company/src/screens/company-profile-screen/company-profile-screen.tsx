
import { useQuery } from '@tanstack/react-query';
import { CompaniesService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';

import { ScrollView, YStack } from 'tamagui';
import CompanyInfoRow from '../../components/company-profile/company-info-row/company-info-row';
import CompanyProfileHeader from '../../components/company-profile/company-profile-header/company-profile-header';
import CompanyContactActions from '../../components/company-profile/company-contact-actions/company-contact-actions';
import CompanyProfileTabs from '../../components/company-profile/company-profile-tabs/company-profile-tabs';

const { useParam } = createParam<{ company: string }>();

export function CompanyProfileScreen() {
  const [companyId] = useParam('company');

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

  const renderLoadingSpinner = () => !data?.data?.id && <FullScreenSpinner />;

  return (
    <ScreenLayout authProtected>
      <AppHeader title="Company Profile" showBackButton />
      {renderLoadingSpinner()}
      {renderCompanyProfile()}
    </ScreenLayout>
  );
}


export default CompanyProfileScreen;
