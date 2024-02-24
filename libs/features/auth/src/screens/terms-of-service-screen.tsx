import { H1, Paragraph, YStack, isWeb } from 'tamagui';
import { t } from 'i18next';

export const TermsOfServiceScreen = () => {
  return (
    <YStack gap="$4" padding="$4">
      {/* only show title on web since mobile has navigator title */}
      {isWeb && <H1>{t('account:terms_of_service.title')}</H1>}
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        quidem neque maxime soluta nostrum unde eligendi, culpa qui
        exercitationem modi quasi debitis voluptatibus, deleniti porro! Nihil
        magni dicta neque aliquid.
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        quidem neque maxime soluta nostrum unde eligendi, culpa qui
        exercitationem modi quasi debitis voluptatibus, deleniti porro! Nihil
        magni dicta neque aliquid.
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        quidem neque maxime soluta nostrum unde eligendi, culpa qui
        exercitationem modi quasi debitis voluptatibus, deleniti porro! Nihil
        magni dicta neque aliquid.
      </Paragraph>
    </YStack>
  );
};
