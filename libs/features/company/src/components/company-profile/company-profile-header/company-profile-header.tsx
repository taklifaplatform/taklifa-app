import { Pencil } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ZixAvatar } from '@zix/ui/common';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';
import { Button, H4, Text, View, XStack, YStack } from 'tamagui';

export type CompanyProfileHeaderProps = {
  company: CompanyTransformer;
};

export const CompanyProfileHeader: React.FC<CompanyProfileHeaderProps> = ({ company }) => {
  const { isAuthMemberInThisCompany, getUrlPrefix } = useAuth();
  const router = useRouter();

  function onEditCompanyPress() {
    router.push(`${getUrlPrefix}/companies/${company.id}/settings`);
  }
  return (
    <YStack gap="$2">
      <XStack gap="$2" justifyContent="space-between" $sm={{ marginTop: '$4' }}>
        <View width="$8" />
        <ZixAvatar
          media={company?.logo}
          name={company?.name}
          size="$9"
        />
        {
          isAuthMemberInThisCompany(company?.id) ? (
            <Button width="$8" size='$2' icon={Pencil} onPress={onEditCompanyPress}>
              {t('common:edit')}
            </Button>
          ) : (
            <View width="$8" />
          )
        }
      </XStack>
      <YStack gap="$2">
        <H4 textAlign="center">{company.name ?? 'N/A'}</H4>
      </YStack>
    </YStack>
  );
};


export default CompanyProfileHeader;
