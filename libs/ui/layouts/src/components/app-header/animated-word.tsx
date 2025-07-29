import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Text } from 'tamagui';

export const AnimatedWord = () => {
  const [animatedText, setAnimatedText] = useState<string[]>([
    'مكيف مركزي',

    'بلاط سيراميك',

    'بلاط رخام',

    'دهان داخلي',

    'دهان خارجي',

    'جبس بورد',

    'حجر طبيعي',

    'حجر صناعي',

    'سلك شائك',

    'طابوق أحمر',

    'طابوق عازل',

    'حديد تسليح',

    'خرسانة جاهزة',

    'باب حديد',

    'باب خشب',

    'باب زجاج',

    'سيراميك أرضيات',

    'سيراميك جدران',

    'رخام أرضيات',

    'رخام درج',

    'عزل مائي',

    'عزل حراري',

    'مظلة سيارات',

    'خزان أرضي',

    'خزان علوي',

    'صرف صحي',

    'بلاط حوش',

    'بلاط إنترلوك',

    'موكيت أرضيات',

    'ورق جدران',

    'شبابيك ألمنيوم',

    'أبواب خشب',

    'مغسلة رخام',

    'أدوات صحية',

    'خلاط موية',

    'مضخة ماء',

    'ليات سباكة',

    'كراسي حمام',

    'رخام مطابخ',

    'مكيف شباك',

    'حديد تسليح',

    'حديد سابك',

    'حديد طري',

    'حديد صلب',

    'حديد مجلفن',

    'حديد شبك',

    'حديد مباني',

    'حديد زوايا',

    'حديد مبروم',

    'حديد ألواح',

    'مغسلة رخام',

    'مكاتب إدارية',

    'كراسي مكتبية',

    'وورك ستيشن',

    'أثاث مكتبي',

    'حجر طبيعي',

    'حجر صناعي',

    'طابوق أحمر',

    'طابوق عازل',

    'سلك شائك',

    'أدوات صحية',

    'خلاط موية',

    'ليات سباكة',

    'كراسي حمام',

    'عزل مائي',

    'عزل حراري',

    'صرف صحي',

    'خزان أرضي',

    'خزان علوي',

    'مضخة ماء',

    'دهان داخلي',

    'دهان خارجي',

    'جبس بورد',

    'ورق جدران',

    'بديل رخام',

    'بديل خشب',

    'ألواح تكسيات',

    'باب خشب',

    'باب حديد',

    'باب زجاج',

    'شبابيك ألمنيوم',

    'أبواب خشب',

    'حديد تسليح',

    'حديد سابك',

    'حديد طري',

    'حديد صلب',

    'حديد مجلفن',

    'حديد شبك',

    'حديد مباني',

    'حديد زوايا',

    'حديد مبروم',

    'حديد ألواح',

    'خرسانة جاهزة',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % animatedText.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    // Animate the text change
    animatedValue.setValue(30); // Start from below
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, animatedValue]);
  return (
    <Animated.View
      style={{
        transform: [{ translateY: animatedValue }],
        opacity: animatedValue.interpolate({
          inputRange: [-30, 0, 30],
          outputRange: [0, 1, 0],
        }),
      }}
    >
      <Text color="$color10" fontWeight="600">
        {'  '} {animatedText[currentIndex]}
      </Text>
    </Animated.View>
  );
};

export default AnimatedWord;