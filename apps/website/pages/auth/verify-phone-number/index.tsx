import { useState, useRef } from 'react';
import { AuthLayout, guestAndUsersGetSSP } from '@zix/features/auth';
import { NextPageWithLayout } from '../../_app';
import { YStack, XStack, Button, H1 } from 'tamagui';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@zix/api';
import { createParam } from 'solito';
import { useRouter } from 'solito/router';

const { useParams } = createParam<{ phone?: string }>();

const Page: NextPageWithLayout = () => {
  const [values, setValues] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const { params } = useParams();
  const router = useRouter();

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < values.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      AuthService.verifyPhoneNumber({
        requestBody: {
          phone_number: params?.phone,
          pin_code: values.join('').toString(),
        },
      }),
    onSuccess({ data }) {
      console.log(data);
      router.push('/app');

    },
    onError(error: any) {
      console.log(error);
    },
  });

  return (
    <YStack alignItems='center' justifyContent='center'
      flex={1}
      gap="$8"
    >
      <H1>
        Enter the code sent to +{params?.phone}
      </H1>
      <XStack>
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type='text'
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{
              width: 50,
              height: 50,
              fontSize: 20,
              textAlign: 'center',
              margin: 5,
              borderRadius: 10,
              border: '1px solid #000'
            }}
          />
        ))}
      </XStack>
      <Button
        onPress={mutateAsync}
      >
        Verify
      </Button>
    </YStack>
  );
};

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestAndUsersGetSSP();

export default Page;
