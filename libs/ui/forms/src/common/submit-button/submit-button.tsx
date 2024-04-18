import { useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { AnimatePresence, Button, ButtonProps, Spinner } from 'tamagui';

// hack to prevent it from breaking on the server
const useIsSubmitting = () => {
  try {
    return useFormState().isSubmitting;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * created to be used in forms
 * will show loading spinners and disable submission when already submitting
 */
export const SubmitButton: React.FC<ButtonProps> = (
  props
) => {
  const { isSubmitting } = useFormState();

  useEffect(() => {
    console.log('====================================');
    console.log('isSubmitting::', isSubmitting);
    console.log('====================================');
  }, [isSubmitting]);
  return (
    <Button
      iconAfter={
        <AnimatePresence>
          {(isSubmitting) && (
            <Spinner
              color="$color12"
              key="loading-spinner"
              opacity={1}
              y={0}
              animation="quick"
              enterStyle={{
                opacity: 0,
                y: 4,
              }}
              exitStyle={{
                opacity: 0,
                y: 4,
              }}
            />
          )}
        </AnimatePresence>
      }
      disabled={isSubmitting}
      {...props}
      height='$5'
      borderRadius='$6'
      fontWeight='bold'
    />
  );
};

export default SubmitButton;
