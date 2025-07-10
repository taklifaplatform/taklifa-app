import { Link } from 'solito/link';
import { Paragraph, Stack, Text, Theme } from 'tamagui';

export const SignInLink = () => {
  return (
    <Link href={`/auth/login`}>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap="$2"
        justifyContent="center"
        marginBottom="$4"
        padding="$4"
      >
        <Paragraph
          textAlign="center"
          theme="alt1"
          fontSize="$4"
          fontWeight="bold"
        >
          هل لديك حساب بالفعل؟
        </Paragraph>

        <Theme name="accent">
          <Text color="$color1" fontWeight="bold" fontSize="$4">
            تسجيل الدخول
          </Text>
        </Theme>
      </Stack>
    </Link>
  );
};

export default SignInLink;