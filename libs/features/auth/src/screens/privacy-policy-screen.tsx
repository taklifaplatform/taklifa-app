import { useMultiLang } from '@zix/i18n';
import { useMixpanel } from '@zix/services/auth';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { Platform } from 'react-native';
import { H1, H2, isWeb, Paragraph, ScrollView, Text, View, YStack } from 'tamagui';

export const PrivacyPolicyScreen = () => {
  useMixpanel('Privacy Policy Screen view')
  const renderListItem = (text: React.ReactNode) => (
    <YStack marginLeft="$4" marginBottom="$2">
      <RenderTextContent>• {text}</RenderTextContent>
    </YStack>
  );

  const { isRtl } = useMultiLang();
  const sharedStyle = {
    textAlign: isRtl ? 'right' : 'left' as 'right' | 'left',
  };

  const sizeTextTitle = 28;
  const sizeTextSouTilte = 24;
  const sizeTextContent = 16;

  const RenderTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
      {...sharedStyle}
      fontSize={sizeTextTitle}
      fontWeight={'800'}
      textAlign="left"
    >
      {children}
    </Text>
  );

  const RenderSemiTitle = ({ children }: { children: React.ReactNode }) => (
    <Text
      {...sharedStyle}
      fontSize={sizeTextSouTilte}
      fontWeight={'800'}
      paddingVertical={5}
      textAlign="left"
    >
      {children}
    </Text>
  );

  const RenderTextContent = ({ children }: { children: React.ReactNode }) => (
    <Text
      {...sharedStyle}
      paddingBottom={5}
      fontSize={sizeTextContent}
      textAlign="left"
    >
      {children}
    </Text>
  );

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

          <RenderTitle>سياسة الخصوصية – تطبيق تكلفة</RenderTitle>
          <RenderTextContent>
            نحن في تطبيق "تكلفة" نُولي أهمية قصوى لخصوصية مستخدمينا ونسعى جاهدين لحماية جميع البيانات الشخصية التي يتم جمعها عبر التطبيق. باستخدامك لتطبيق تكلفة، فإنك توافق على جمع واستخدام معلوماتك وفقًا لما هو موضح في هذه السياسة.
          </RenderTextContent>

          <RenderSemiTitle>المعلومات التي نجمعها:</RenderSemiTitle>
          {renderListItem("الاسم، رقم الجوال، وموقعك الجغرافي عند طلب الخدمة.")}
          {renderListItem("بيانات الاستخدام التي تساعد في تحسين أداء التطبيق.")}

          <RenderSemiTitle>كيفية استخدام المعلومات:</RenderSemiTitle>
          {renderListItem("لتسهيل عملية الربط بين طالب الخدمة ومقدمها.")}
          {renderListItem("لتحسين تجربة المستخدم وتطوير خدمات التطبيق.")}

          <RenderSemiTitle>مشاركة البيانات:</RenderSemiTitle>
          <RenderTextContent>
            لا يتم مشاركة أي بيانات مع أطراف خارجية، إلا في الحالات الضرورية المرتبطة بتنفيذ الخدمة أو بما يتوافق مع القوانين المحلية.
          </RenderTextContent>
        </YStack>
        <View height={100} />
      </ScrollView>
    </>
  );
};