import { H1, YStack, isWeb, Text, ScrollView } from 'tamagui';
import { t } from 'i18next';
import { AppHeader } from '@zix/ui/layouts';
import { useMultiLang } from '@zix/i18n';

export const TermsOfServiceScreen = () => {
  const { isRtl } = useMultiLang();
  const sharedStyle = {
    textAlign: isRtl ? 'left' : 'right',
  };

  const sizeTextTitle = 28;
  const sizeTextSouTilte = 24;
  const sizeTextContent = 16;
  const titleApp = t('common:app_name');

  const RenderTitle = ({ children }: any) => (
    <Text
      {...sharedStyle}
      fontSize={sizeTextTitle}
      fontWeight={'800'}
    >
      {children}
    </Text>
  );
  const RenderSemiTitle = ({ children }: any) => (
    <Text
      {...sharedStyle}
      fontSize={sizeTextSouTilte}
      fontWeight={'800'}
      paddingVertical={5}
    >
      {children}
    </Text>
  );
  const RenderTextContent = ({ children }: any) => (
    <Text
      {...sharedStyle}
      paddingBottom={5}
      fontSize={sizeTextContent}
    >
      {children}
    </Text>
  );
  const RenderAppTitle = ({ children }: any) => (
    <Text {...sharedStyle} fontWeight={'800'}>
      {' '}
      {children}{' '}
    </Text>
  );
  const RenderTextLink = ({ children }: any) => (
    <Text {...sharedStyle} fontWeight={'800'} color={'primary.500'}>
      {' '}
      {children}{' '}
    </Text>
  );
  return (
    <>
      <AppHeader
        title={t('account:terms_of_service.title')}
        showBackButton
        hideOnWeb
      />
      <ScrollView flex={1}>
        <YStack gap="$4" padding="$4">
          {/* only show title on web since mobile has navigator title */}
          {isWeb && <H1>{t('account:terms_of_service.title')}</H1>}
          <RenderTitle>اتفاقية الشروط و الأحكام</RenderTitle>
          <RenderSemiTitle>المقدمة</RenderSemiTitle>
          <RenderTextContent>
            عبر دخولك و استخدامك <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
            فانك تقر و توافق, دون أي تعديل أو قيود أو تبديل, على اتفاقية الشروط
            و الأحكام هذه و على أبة سياسات أخرى تحكم الاستفادة من خدمات تطبق
            تاجر عقار, و تقر و تضمن أهليتك القانونية للدخول في هذه الاتفاقية
            وفقا لجميع الشروط و الأحكام الواردة فيها.
          </RenderTextContent>
          <RenderTextContent>
            اٍنَ اتفاقية الشروط و الأحكام التي تم نشرها على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle> وضعت لحماية و حفظ حقوق
            كل من <RenderAppTitle>{titleApp}</RenderAppTitle> و المستخدمين الذين
            يستقدمون من خدمات <RenderAppTitle>{titleApp}</RenderAppTitle> بتسجيل
            أو من دون تسجيل.
          </RenderTextContent>
          <YStack>
            <RenderSemiTitle>التعريفات :</RenderSemiTitle>
            <YStack paddingRight={20}>
              <RenderTextContent>
                {' '}
                تطبيق {titleApp} على نظام IOS
              </RenderTextContent>

              <RenderTextContent>
                تطبيق {titleApp} على نظام أندرويد
              </RenderTextContent>
              <RenderTextContent>
                {' '}
                موقع{titleApp}{' '}
                <RenderTextLink>(www.{titleApp}.com)</RenderTextLink>
              </RenderTextContent>
              <RenderTextContent>
                المستخدم: هو الشخص الحقيقي أو الاعتباري الذي ليصل أو يستخدم الى{' '}
                <RenderAppTitle>{titleApp}</RenderAppTitle>
                للاستفادة من الخدمات التي تقدم من خلال المنصة سواء بتسجيل أو
                بدون تسجيل. و يشار اْليهم مجتمعين في هذه الاتفاقية بـ
                (المستخدمين).{' '}
              </RenderTextContent>
            </YStack>
          </YStack>
          <RenderSemiTitle>المادة الأولى: الأحكام العامة</RenderSemiTitle>
          <RenderTextContent>
            تخضع بنود هذه الإتفاقية لكافة الأنظمة و التشريعات و التعليمات سارية
            المفعول بالمملكة العربية السعودية إذا أصبح أي حكم من أحكام هذه
            الاتفاقية غير قانونية أو لاغي أو غير ساري المفعول بموجب أية أنظمة أو
            قوانين أو أحكام قضائية, فإن باقي الأحكام و الشروط الأخرى في هذه
            الاتفاقية تبقى فاعلة و سارية المفعول و قانونية و معمول بها في هذه
            الاتفاقية و قابلة للتطبيق بموجب القوانين.
          </RenderTextContent>
          <RenderTextContent>
            نسعى قدر الإمكان إلى توفير المعلومات على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            بدقة متناهية, إلا أنه قد ترد بعض الأخطاء من حين لآخر, و لانتحمل أي
            مسؤولية عن أي خطأ في المعلومات التي تتضمنها{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderSemiTitle>المادة الثانية : الاستخدام المقبول</RenderSemiTitle>
          <RenderTextContent>
            عند استخدامك <RenderAppTitle>{titleApp}</RenderAppTitle>
            فإنك تقر و تلتزم بالتالي :{' '}
          </RenderTextContent>
          <RenderTextContent>
            تقر و تضمن أهليتك القانونية للدخول في هذه الاتفاقية وفقا لجميع
            الشروط و الأحكام الواردة فيها.
          </RenderTextContent>
          <RenderTextContent>
            استخدام الموقع بصفتك الشخصية أو بالنيابة عن شخص لك للحق في تمثيله
            على <RenderAppTitle>{titleApp}</RenderAppTitle>
            (على سبيل المثال لا الحصر : عن طريق الوكالة أو التوظيف) فقط, وعدم
            استخدام <RenderAppTitle>{titleApp}</RenderAppTitle>
            بصفة أي شخص لا يحق لك تمثيله.{' '}
          </RenderTextContent>
          <RenderTextContent>
            ضمان صحة كافة المعلومات المدخلة في{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            سواء كانت معلومات المستخدم أو مدخلة كمواد أو محتوى للمشاركة أو
            الإعلان عبر <RenderAppTitle>{titleApp}</RenderAppTitle>.{' '}
          </RenderTextContent>
          <RenderTextContent>
            عدم مشاركة أي معلومات ليس لديك حق نشرها او مشاركتها.
          </RenderTextContent>
          <RenderTextContent>
            عدم نسخ أي محتوى من <RenderAppTitle>{titleApp}</RenderAppTitle>و
            إعادة نشره في مواقع أخرى بدون موافقة مالك المحتوى. تحمل مسؤولية
            التحقق من تفاصيل أي محتوى منشور على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>و تأكيده و الاطمئنان إلى
            صحتها و تتحمل مسؤولية الاستعانة بأي مختص فني أو الحصول على المشورة
            القانونية قبل الالتزام بأي عملية, و تتحمل مسؤولية ضمانتصرفك بحسن نية
            تجاه أي أطراف أخرى.{' '}
          </RenderTextContent>
          <RenderTextContent>
            دفع كافة الرسوم المترتبة على خدمات{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            عند استحقاقها.{' '}
          </RenderTextContent>
          <RenderTextContent>
            انطباق كافة الاشتراطات و الالتزامات الحكومية عليك و حصولك على كافة
            التراخيص المطلوبة للاستفادة من خدمات{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            عدم التعدي على أي مستخدم آخر داخل{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            أو محاولة الغش أو الكذب أو التدليس لإلحاق الضرر بأي مستخدم آخر{' '}
          </RenderTextContent>
          <RenderTextContent>
            أو عدم استخدام أي وسيلة (بما في ذلك -على سبيل المثال لا الحصر -
            محاولة إخفاءالهوية عبر برامج الــVPN لانتهاك الشروط و الأحكام في{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            أو لتجاوز الإجراءات الوقائية التي تطبقها البروكسي Proxy) عند مخالفة
            الشروط و الأحكام أو الوصول لمحتوى{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            بشكل غير مسموح أو لتجميع و تحصيل معلومات و بيانات تخص{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            أو مستخميه و الاستفادة منها بأي شكل من الأشكال أو إعادة نشرها بدون
            إذن.
          </RenderTextContent>
          <RenderTextContent>
            عدم نشر أو توزيع أو تحميل أي مواد تشهيرية أو هجومية أو ذغنتهاكية أو
            مضرة أو تهديدية أو مسيئة أو ملتوية أو عنصرية أو غير ملائمة أخلاقيًا
            أو غير ذلك من المحتوى أو معلومات غير قانونية.
          </RenderTextContent>
          <RenderTextContent>
            عدم نشر أي محتوى أو مواد وهمية أو تخمينية أو تعليقات كاذبة أو غير
            دقيقة أو مضللة أو خادعة أو قذف أو تشهير .
          </RenderTextContent>
          <RenderTextContent>
            عدم التعرض للسياسات أو السيادات الدولية أو الشخصيات المعتبرة أو أي
            مناقشات لا تتعلق بالخدمات المقدمة على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            تحمل كافة المسؤولية القانونوية و الجنائية الناتجة عن أي مخالفة من
            قبل (المستخدم) لاتفاقية الشروط و الأحكام .{' '}
          </RenderTextContent>
          <RenderSemiTitle>المادة الثالثة: الإجراءات الوقائية</RenderSemiTitle>
          <RenderTextContent>
            سعيا منا لرفع مستوى و جودة الخدمة المقدمة لمستخدمي{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>, و تبعا لاستخدامك هذه
            الشروط و الأحكام فإنك توافق و تعطي الحق في تطبيق أي من
            الإجراءاتالتالية دون سابق إنذار إذا تقرر لديها أنك خرقت اتفاقية
            الشروط و الأحكام الخاصة بـ
            <RenderAppTitle>{titleApp}</RenderAppTitle>:{' '}
          </RenderTextContent>
          <RenderTextContent>
            ايقاف عضويتك و حظرك بشكل مؤقت أو دائم من استخدام كل أو أي من خدمات{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>, مع الاحتفاظ بالحق في
            عدم تعويضك عن أي خدمات مدفوعة مسبقا.{' '}
          </RenderTextContent>
          <RenderTextContent>
            حذف كافة أو أي من المواد أو المحتوى الذي قام (المستخدم) بنشره على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            التبليغ عن الأنشطة الخاصة بك الى السلطات المختصة
          </RenderTextContent>
          <RenderTextContent>اتخاذ أي إجراءات قانونية ضدك</RenderTextContent>
          <RenderSemiTitle>المادة الرابعة: حدود المسؤولية</RenderSemiTitle>
          <RenderTextContent>
            عند استخدامك <RenderAppTitle>{titleApp}</RenderAppTitle>
            فإنك تفهم و توافق على الآتي:{' '}
          </RenderTextContent>
          <RenderTextContent>
            لا تقدم تطبيق {titleApp} أي ضمانات و لا تتحمل أي مسؤولية في حالة عدم
            التزام (المستخدم) باتفاقية الشروط و الأحكام و لا نتحمل المسؤولية عن
            أي مخاطرة أو أضرار أو تبعات أو خسائر تقع عليه أو على أي طرف آخر لا
            تقدم تطبيق {titleApp} أي ضمان أو تتحمل أية مسؤولية عن دقة أو اكتمال
            أو صحة أي من المعلومات الواردة في المحتوى المنشور على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            من قبل (المستخدمين), و لا مدى التزامه بالأنظمة و القوانين المطبقة
            ذات العلاقة, و يتحمل.{' '}
          </RenderTextContent>
          <RenderTextContent>
            لا تتحمل <RenderAppTitle>{titleApp}</RenderAppTitle>
            في أي حال من الأحوال المسؤولية عن أية أضرار (بما في ذلك -دون الحصر-:
            التعويض عن فقدان البيانات أو الأرباح, أو انقطاع الأعمال) التي تنشأ
            من استخدام أو عدم القدرة على استخدام المحتوى و المواد على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>.{' '}
          </RenderTextContent>
          <RenderTextContent>
            لا تتحمل <RenderAppTitle>{titleApp}</RenderAppTitle>
            أي مسؤولية تجاه عن أية خسارة أو ضرر, ناشئ أو يتعلق بالآتي:{' '}
          </RenderTextContent>
          <RenderTextContent>
            أية عطل بسبب البرنامج أو أخطاء في شبكة الإنترنت أو عدم توفر أو أي
            أسباب أخرى خارجة عن إرادتنا المعقولة.
          </RenderTextContent>
          <RenderTextContent>
            أي فقدان لكلمة المرور أو الحساب إذا كان بسبب انقطاع الكهرباء أو حدوث
            خطأ بها أو توقفها أو بسبب نظام الكمبيوتر الخاص بك أو الحساب الخاص بك
            الاعتماد على أي محتوى أو معلومات تم عرضها على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>,{' '}
          </RenderTextContent>
          <RenderTextContent>
            أي خسارة مباشرة أو تبعية أو خاصة أو جزائية أو ضرر أو تكاليف أو نفقات
            أو خسارة أرباح أو خسارة أعمال أو خسارة الشهرة أو تراجع الشهرة أو فقد
            البيانات أو تلفها أو فسادها
          </RenderTextContent>
          <RenderTextContent>
            لا تتحمل تطبيق {titleApp} مسؤولية أي خسارة أو ضرر ينتج من أي فيروس
            أو هجوم أدى لقطع الخدمة أو مواد أخرى ضارة تقنيًا تصيب أجهزتك أو
            برامجك الحاسوبية أو البيانات أو الممتلكات الأخرى نتيجة استخداكم{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            أو تحميلك أي محتوى عليها أو على أي مقع مرتبط بها
          </RenderTextContent>
          <RenderSemiTitle>
            المادة الخامسة: سياسة خصوصية البيانات
          </RenderSemiTitle>
          <RenderTextContent>
            باستخدامك <RenderAppTitle>{titleApp}</RenderAppTitle>
            فإنك توافق على الآتي:{' '}
          </RenderTextContent>
          <RenderTextContent>
            قيام <RenderAppTitle>{titleApp}</RenderAppTitle>
            بجمع معلوماتك الشخصية و بيانات تفاعلك على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            لتطوير و تحسين الخدمات المقدمة تشمل هذه المعلومات:
          </RenderTextContent>
          <RenderTextContent>البريد الإلكتروني</RenderTextContent>
          <RenderTextContent>رقم الجوال</RenderTextContent>
          <RenderTextContent>بيانات الهوية الوطنية</RenderTextContent>
          <RenderTextContent>نوع و بيانات الجهز و المتصفح</RenderTextContent>
          <RenderTextContent> عنوان الـ IP</RenderTextContent>
          <RenderTextContent>بيانات الصكوك و ملكية العقارات</RenderTextContent>
          <RenderTextContent>
            المحتوى الذي تقوم بنشره على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>بيانات الدفع</RenderTextContent>
          <RenderTextContent>
            بيانات التفاعل و التصفح على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            الرسائل الخاصة على <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            قيام <RenderAppTitle>{titleApp}</RenderAppTitle>
            باستخدام هذه البيانات للأسباب التالية:{' '}
          </RenderTextContent>
          <RenderTextContent>
            تقديم أفضل الخدمات و منحك تجربة خاصة و العمل على تلبية احتياجاتك
            الفردية على أفضل وجه{' '}
          </RenderTextContent>
          <RenderTextContent>تطوير أداء استخدام الموقع</RenderTextContent>
          <RenderTextContent>تحسين خدمة المستخدمين</RenderTextContent>
          <RenderTextContent>
            إرسال تنبيهات و رسائل و إشعارات لمستخدمي{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            عمل إحصائيات و أبحاث و تقارير عن الخدمات و المجالات التي تخدمها{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            التحقق من عمليات الدفع في الخدمات المتوفرة على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
          <RenderTextContent>
            مشاركة هذه المعلومات مع الشركاء الذين يقدمون خدمات تحلبل البيانات و
            التسويق بالقدر الضروري
          </RenderTextContent>
          <RenderTextContent>
            مشاركة هذه المعلومات مع جهات تنفيذ القانون استجابة للطلبات القانونية
            التي قد نتلقاها
          </RenderTextContent>
          <RenderTextContent>
            قيام تطبيق {titleApp} بتوثيق و أرشفة الشكاوي و الوقائع المخالفة و
            الاحتفاظ بها لتقديمها للجهات ذات العلاقة
          </RenderTextContent>
          <RenderSemiTitle>المادة السادسة: شروط الإعلانات</RenderSemiTitle>
          <RenderTextContent>
            عند قيامك بنشر أي إعلان على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            فإنك تقر و تلتزم بالتالي:{' '}
          </RenderTextContent>
          <RenderTextContent>
            مطاقبة الإعلان للقسم الذي نشر فيه
          </RenderTextContent>
          <RenderTextContent>صحة كافة المعلومات المدخلة</RenderTextContent>
          <RenderTextContent>
            شمول الإعلان كامل التفاصل و نشره في القسم الصحيح
          </RenderTextContent>
          <RenderTextContent>
            كون الصور المضافة في الإعلان لنفس الوحدة المعلن عنها مع عدم إرفاق
            صور نموذج أو صور رمزية
          </RenderTextContent>
          <RenderTextContent>
            متابعة الإعلانات و تحديثها بشكل مستمر
          </RenderTextContent>
          <RenderTextContent>
            التفاعل و الرد على تواصل المستخدمين بخصوص الإعلان
          </RenderTextContent>
          <RenderTextContent>دفع رسوم الإعلان الموضحة له</RenderTextContent>
          <RenderSemiTitle>
            المادة السابعة أحكام خدمة (التأجير الفوري){' '}
          </RenderSemiTitle>
          <RenderTextContent>
            خدمة (التأجير الفوري) عل <RenderAppTitle>{titleApp}</RenderAppTitle>
            تخدم المؤجر الذي يرغب في عرض الوحدات المتاحة لديه للتأجير قصير المدى
            و المستأجر الباحث عن الوحدات المتاحة للتأجير قصير المدى أو السياحي,
            و يقتصر دور <RenderAppTitle>{titleApp}</RenderAppTitle>
            فيها على تسهيل إكمال عملية التأجير و استلام مبلغ الإيجار من المستأجر
            و تسليمه للمؤجَر بعد انتهاء فترة التأخير حسب أحكام الخدمة عند
            استخدامك لخدمة التأجير الفوري فإنك تفهم و توافق على أن علاقة{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>و المؤجَر و المستأجر هي
            علاقة أطرف مستقلين و لا تعتبر هذه العلاقة علاقة شراكة أو توظيف أو
            الوكالة بين أيَ منهم, و ليس لـ
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            أي مسؤولية أو تحكم على كيفية إدارة المؤجَر للوحدات أو انتفاع
            المستأجر من الوحدات{' '}
          </RenderTextContent>
          <RenderTextContent>
            عند استعراضك للوحدات ومحاولة استئجار أو إتمام استئجار أي وحدة معروضة
            في الخدمة كمستأجر، فإنك تقر وتلتزم بالتالي :
          </RenderTextContent>
          <RenderTextContent>
            طلاعك على مواصفات واشتراطات الوحدة عند استئجارھا والموافقة علیھا
          </RenderTextContent>
          <RenderTextContent>
            دفع كامل قیمة الإیجار لفترة التأجیر المطلوبة
          </RenderTextContent>
          <RenderTextContent>
            طبیق سیاسة الإلغاء والاسترجاع المحددة للوحدة من قبل المؤ ّجر في حالة
            رغبت في إلغاء التأجیر بعد اكتمال العملیة حسن التصرف أثناء تواجدك
            بالوحدة المستأجرة وعدم التفریط أو إساءة استخدام أي من مرافق الوحدة.
          </RenderTextContent>
          <RenderTextContent>
            إعطاء المؤجر الحق في مطابقة ھویتك مع الھویة المستخدمة أثناء عملیة
            التأجیر قبل تمكینك من الاستفادة من الوحدة، ومنعك من الاستفادة
            منالوحدة في حالة عدم تطابقها
          </RenderTextContent>
          <RenderTextContent>
            إخلاء مسؤولیة <RenderAppTitle>{titleApp}</RenderAppTitle> في حالة
            عدم تقدیم أي شكوى متعلقة بالتأجیر بعد انتھاء فترة التأجیر بأربع
            .وعشرین ساعة
          </RenderTextContent>
          <RenderTextContent>
            عند عرض أو إتاحة أي وحدة للتأجیر عبر الخدمة كمؤجر، فإنك توافق وتلتزم
            بالتالي :
          </RenderTextContent>
          <RenderTextContent>
            تطبیق كافة الأنظمة والقوانین والتشریعات ذات العلاقة والحصول على كافة
            التراخیص والتصاریح النظامیة المطلوبة .للمؤجر وللوحدة وتوفر الأھلیة
            والأحقیة القانونیة لتأجیر الوحدة المعروضة وتحمل تبعات أي مخالفة لذلك
          </RenderTextContent>
          <RenderTextContent>
            تحري الدقة في جمیع معلومات الوحدة المعروضة عبر{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle> وأنھا صحیحة (على سبیل
            المثال لا الحصر: الصور والتوافر والأسعار والخدمات ووصف المرافق
            والموقع)، والتعھد بإبقاء تلك المعلومات محدثة على الدوام .
          </RenderTextContent>
          <RenderTextContent>
            عدم تعدیل أي من مزایا الوحدة المعروضة بعد تأجیرھا (وحتى انتھاء فترة
            التأجیر) دون موافقة المستأجر
          </RenderTextContent>
          <RenderTextContent>
            عند تأكید أي عملیة تأجیر عبر{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle> فإن ھذا التأكید بمثابة
            تعاقد بینك وبین المستأجر لتمكین المستأجر من الاستفادة من الوحدة
            ومرافقھا حسب الشروط والمواصفات والأسعار المعروضة على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>
            طوال مدة التأخير .
          </RenderTextContent>
          <RenderTextContent>
            تفویض <RenderAppTitle>{titleApp}</RenderAppTitle> بتحصیل قیمة إیجار
            الوحدة عند تأجیرھا من قبل أي مستخدم (بالإضافة إلى الرسوم .والضرائب
            الحكومیة) حسب السعر المحدد من قبلك المؤجر لمدة التأجیر
          </RenderTextContent>
          <RenderTextContent>
            تطبیق أحكام سیاسة الإلغاء والاسترجاع التي تقوم باختیارھا للوحدة على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>.
          </RenderTextContent>
          <RenderTextContent>
            عدم فرض أي شروط أو أحكام على المستأجر تتعارض مع ھذه الأحكام، وتتعھد
            بتضمین الإعلان الوحدة أي .اشتراطات أو أحكام یجب على المستأجر
            الالتزام بھا
          </RenderTextContent>
          <RenderTextContent>
            إخلاء مسؤولیة <RenderAppTitle>{titleApp}</RenderAppTitle> عن أیة
            أضرار یتسبب فیھا المستأجر للوحدة
          </RenderTextContent>
          <RenderTextContent>
            دفع أیة رسوم أو عمولات تفرضھا{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle> على الخدمة
          </RenderTextContent>
          <RenderTextContent>
            تحویل <RenderAppTitle>{titleApp}</RenderAppTitle> قیمة الإیجارات مخص
            ًوما منھا أي مبالغ أو رسوم مستحقة لـ
            <RenderAppTitle>{titleApp}</RenderAppTitle> (وأي ضرائب أو رسوم
            الحكومیة مفروضة على العملیات) إلى حسابك المع ّرف في{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle> بعد انتھاء فترة التأجیر
            حسب جدولة الدفع باشتراط عدم وجود أي شكاوى من المستأجر متعلقة
            بالعملیة
          </RenderTextContent>
          <RenderTextContent>
            فرض <RenderAppTitle>{titleApp}</RenderAppTitle> رسم تعویض عن أي
            عملیة تأجیر لا یتمكن المستأجر فیھا من الاستفادة من الوحدة المؤجرة
            لسبب عائد لك (على سبیل المثال لا الحصر: إلغاء التأجیر من طرفك أو
            تأجیر الوحدة لطرف آخر خلال نفس المدة أو وجود عیب في الوحدة أو وجود
            فرق جوھري عن البیانات المعلنة)، إضافة إلى تنازلك عن حقك في قیمة
            الايجار, حسب التفصيل التالي :
          </RenderTextContent>
          <RenderTextContent>
            إذا تم إلغاء التأجیر خلال 48 ساعة أو أقل من موعد بدایة التأجیر أو
            بعد بدایة مدة التأجیر، تكون قیمة التعویض %50 من قیمة التأجیر للأیام
            التي لم یستفد منھا المستأجر
          </RenderTextContent>
          <RenderTextContent>
            إذا تم إلغاء الإیجار قبل 48 ساعة وحتى 30 یوم من بدایة مدة التأجیر،
            تكون قیمة التعویض %25 من قیمة الإیجار
          </RenderTextContent>
          <RenderTextContent>
            إذا تم إلغاء الإیجار قبل 30 یوم من بدایة مدة التأجیر، تكون قیمة
            التعویض %10 من قیمة الإیجار
          </RenderTextContent>
          <RenderTextContent>
            لا تزید قیمة التعویض عن 10,000 ریال سعودي، بغض النظر عن قیمة الإیجار
          </RenderTextContent>
          <RenderSemiTitle>المادة التاسعة: المدفوعات</RenderSemiTitle>
          <RenderTextContent>
            عند قیامك بالدفع مقابل أي خدمة{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle> فإنك تقر وتلتزم
            بالتالي :
          </RenderTextContent>
          <RenderTextContent>
            یحق لـ<RenderAppTitle>{titleApp}</RenderAppTitle> رفض أي طلب
            استرجاع لأي مبلغ بعد الدفع(تشمل على سبیل المثال لا الحصر: الباقات
            والترقیات والتمییز والاشتراكات والرسوم) ، مع استثناء الحالات التالیة
            :
          </RenderTextContent>
          <RenderTextContent>
            یحق لك طلب استرجاع عمولة مدفوعة على إعلان عقاري خلال (10) أیام من
            تاریخ الدفع في حال ثبوت وجود خطأ من طرف (المستخدم).
          </RenderTextContent>
          <RenderTextContent>
            یحق لك طلب نقل خدمات الباقة مستخدم آخر خلال (5) أیام من تاریخ الدفع
          </RenderTextContent>
          <RenderTextContent>
            عند طلب استرجاع أي مبلغ مدفوع فإنك توافق على تحمل أي رسوم تتحملھا
            تطبیق {titleApp} على إرجاع المبلغ (على سبیل المثال لا الحصر: رسوم
            الحوالات أو رسوم بوابات الدفع)
          </RenderTextContent>
          <RenderSemiTitle>المادة العاشرة: تعدیل الاتفاقیة</RenderSemiTitle>
          <RenderTextContent>
            عند استخدامك <RenderAppTitle>{titleApp}</RenderAppTitle> فإنك
            توافق وتقر بأننا قد نقوم بعمل أي تحدیث أو تغییر أو تعدیل على الشروط
            والأحكام في أي وقت وبدون سابق إنذار. و أن أي تعديلات على الشروط و
            الأحكام تصبح سارية المفعول بمجرد نشرها على{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>, و لن يكون لها
            أثر رجعي على أي تعاملات تمت مسبقا من خلال{' '}
            <RenderAppTitle>{titleApp}</RenderAppTitle>{' '}
          </RenderTextContent>
        </YStack>
      </ScrollView>
    </>
  );
};
