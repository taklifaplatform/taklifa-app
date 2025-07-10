import { ZixAlertActions } from '@zix/ui/common';
import { CheckedGif } from '@zix/ui/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'solito/router';

/**
 * Renders the sign-up success screen.
 * This screen is displayed after a user successfully signs up.
 * It shows a success message, account verification process message (if applicable),
 * and a button to proceed to the next step or redirect to a specified page.
 */
export const SignUpSuccessScreen = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess(false);
      router.push('/app/(tabs)/');
    }, 3000);
  }, []);

  return (
    <ZixAlertActions
      title="تم إنشاء حسابك بنجاح!"
      description="قد يستغرق الأمر بضعة أيام للتحقق من حسابك
يمكنك البدء باستخدام تطبيق تكلفة الآن"
      icon={<CheckedGif width={35} height={35} />}
      closeButton={isSuccess}
    />
  );
};

export default SignUpSuccessScreen;
