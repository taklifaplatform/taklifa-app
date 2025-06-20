import { useMultiLang } from '@zix/i18n';
import { useMixpanel } from '@zix/services/auth';
import { AppHeader } from '@zix/ui/layouts';
import { t } from 'i18next';
import { H1, isWeb, ScrollView, Text, YStack } from 'tamagui';

export const TermsOfServiceScreen = () => {
  useMixpanel('Terms of Service Screen view')
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
      <AppHeader
        title={t('account:terms_of_service.title')}
        showBackButton
      />
      <ScrollView flex={1}>
        <YStack gap="$4" padding="$4" alignItems="flex-start">
          {isWeb && <H1>{t('account:terms_of_service.title')}</H1>}
          
          <RenderTitle>الشروط والأحكام – تطبيق سواعد</RenderTitle>
          <RenderTextContent>
            يرجى قراءة الشروط التالية بعناية قبل استخدام تطبيق "سواعد". باستخدامك للتطبيق، فإنك تُقر بقبولك الكامل لجميع الشروط والأحكام التالية:
          </RenderTextContent>

          <RenderSemiTitle>طبيعة الخدمة</RenderSemiTitle>
          <RenderTextContent>
            تطبيق سواعد يعمل كوسيط إلكتروني بين طالب الخدمة (العميل) ومقدم الخدمة (السائق أو الناقل)، ولا يقدم خدمات النقل بنفسه.
          </RenderTextContent>

          <RenderSemiTitle>حدود المسؤولية</RenderSemiTitle>
          <RenderTextContent>
            لا يتحمل تطبيق سواعد أي مسؤولية مباشرة أو غير مباشرة عن أي تلف، فقدان، أو سرقة للممتلكات المنقولة. يتحمل مقدم الخدمة كامل المسؤولية القانونية والمالية تجاه العميل عن أي ضرر ناتج عن الخدمة.
          </RenderTextContent>

          <RenderSemiTitle>مسؤولية مقدم الخدمة</RenderSemiTitle>
          <RenderTextContent>
            مقدم الخدمة مسؤول مسؤولية كاملة عن الأمان وجودة الخدمة، ويُعتبر رقم جواله المُسجل في التطبيق هو المعرف الرسمي له لأي إجراء أو تعهد.
          </RenderTextContent>

          <RenderSemiTitle>استخدام التطبيق</RenderSemiTitle>
          <RenderTextContent>
            يُمنع استخدام التطبيق لأي أغراض غير قانونية أو تنتهك حقوق الغير. ويحتفظ التطبيق بحقه في حظر أو تعليق حساب أي مستخدم يخالف هذه الشروط.
          </RenderTextContent>

          <RenderSemiTitle>التعديلات</RenderSemiTitle>
          <RenderTextContent>
            يحق لإدارة تطبيق سواعد تعديل هذه الشروط في أي وقت، وسيتم إشعار المستخدمين بأي تغييرات عند الدخول إلى التطبيق.
          </RenderTextContent>
        </YStack>
      </ScrollView>
    </>
  );
};
