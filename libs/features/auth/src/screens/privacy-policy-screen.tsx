import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { Platform } from 'react-native';
import { H1, H2, Paragraph, ScrollView, View, YStack, isWeb } from 'tamagui';

export const PrivacyPolicyScreen = () => {
  return (
    <>
      {Platform.OS !== 'web' && <AppHeader
        title={t('account:privacy_policy.title')}
        showBackButton
      />}
      <ScrollView paddingTop="$6">
        {Platform.OS === 'web' && <AppHeader
          title={t('account:privacy_policy.title')}
          showBackButton
        />}
        <YStack gap="$4" padding="$4">
          {isWeb && <H1>{t('account:privacy_policy.title')}</H1>}
          
          <H2>Introduction</H2>
          <Paragraph>
            Sawaeed Inc ("we," "us," or "our") operates the Sawaeed mobile application (the "Service"). 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            {isWeb ? <br /> : '\n\n'}
            By using Sawaeed, you consent to the practices described in this policy.
          </Paragraph>

          <H2>Information We Collect</H2>
          <Paragraph>
            We may collect:
            {isWeb ? <br /> : '\n'}
            • Personal Data (email, name if provided){isWeb ? <br /> : '\n'}
            • Usage Data (device info, IP address){isWeb ? <br /> : '\n'}
            • Log Data (crash reports via third-party tools)
          </Paragraph>

          <H2>Third-Party Services</H2>
          <Paragraph>
            We use:
            {isWeb ? <br /> : '\n'}
            • Google Analytics ({isWeb ? <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> : 'Privacy Policy: https://policies.google.com/privacy'}){isWeb ? <br /> : '\n'}
            • Firebase ({isWeb ? <a href="https://firebase.google.com/support/privacy" target="_blank">Privacy Policy</a> : 'Privacy Policy: https://firebase.google.com/support/privacy'})
          </Paragraph>

          <H2>Data Security</H2>
          <Paragraph>
            We implement security measures, but no method is 100% secure.
          </Paragraph>

          <H2>Children's Privacy</H2>
          <Paragraph>
            Our app does not target users under 13. We delete unintended child data.
          </Paragraph>

          <H2>Changes to This Policy</H2>
          <Paragraph>
            Last Updated: 2025-05-15{isWeb ? <br /> : '\n'}
            We'll notify users of changes via app updates.
          </Paragraph>

          <H2>Contact Us</H2>
          <Paragraph>
            For questions or data requests:{isWeb ? <br /> : '\n'}
            Email: <Paragraph fontWeight="bold">admin@zixdev.com</Paragraph>
          </Paragraph>
        </YStack>
        <View 
        height={100}
        />
      </ScrollView>
    </>
  );
};