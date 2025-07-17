import { CompanyTransformer } from '@zix/api';
import { CompanyCard, CompanyProfileTabs } from '@zix/features/company';
import { ScrollView, YStack } from 'tamagui';

interface CompanyDetailProps {
  company: CompanyTransformer;
  setShowSheet: (show: boolean) => void;
  onScroll?: (event: any) => void;
}

export function CompanyDetail({ company, setShowSheet, onScroll }: CompanyDetailProps) {
  return (
    <ScrollView flex={1} onScroll={onScroll}>
      <YStack padding="$4" marginBottom="$4" gap="$4">
        <CompanyCard
          company={company}
          backgroundColor="$color2"
          showContactActions
          useShowButton={true}
          setShowSheet={setShowSheet}
        />
      </YStack>
      <CompanyProfileTabs
        company={company}
        hideFilters={true}
        setShowSheet={setShowSheet}
      />
    </ScrollView>
  );
}

export default CompanyDetail;
