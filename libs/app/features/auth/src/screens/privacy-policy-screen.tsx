import { H1, Paragraph, YStack, isWeb } from '@zix/app/ui/core'
import { t } from 'i18next';

export const PrivacyPolicyScreen = () => {
  return (
    <YStack gap="$4" padding="$4">
      {/* only show title on web since mobile has navigator title */}
      {isWeb && <H1>{t('account:privacy_policy.title')}</H1>}
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quidem neque maxime
        soluta nostrum unde eligendi, culpa qui exercitationem modi quasi debitis voluptatibus,
        deleniti porro! Nihil magni dicta neque aliquid.
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quidem neque maxime
        soluta nostrum unde eligendi, culpa qui exercitationem modi quasi debitis voluptatibus,
        deleniti porro! Nihil magni dicta neque aliquid.
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quidem neque maxime
        soluta nostrum unde eligendi, culpa qui exercitationem modi quasi debitis voluptatibus,
        deleniti porro! Nihil magni dicta neque aliquid.
      </Paragraph>
    </YStack>
  )
}
