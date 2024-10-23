import { createContext, forwardRef, useState } from 'react';
import {
  ScrollView,
  TamaguiElement,
  YStack,
  YStackProps,
  withStaticProperties
} from 'tamagui';

const FormWrapperContext = createContext<{ height: number } | null>(null);
/**
 * this utility component is for creating forms where we want to
 * push the action button to the bottom of the screen on native
 * it also handles keyboard avoidance
 *
 * wrap the fields inside Body and the actions in Footer
 *
 * you may use asChild on the wrapper as well
 */
const Wrapper = forwardRef<TamaguiElement, YStackProps>(function Wrapper(
  props,
  ref
) {
  const [height, setHeight] = useState(0);

  return (
    <FormWrapperContext.Provider value={{ height }}>
      <YStack
        onLayout={(event) => {
          setHeight(event.nativeEvent.layout.height);
        }}
        ref={ref}
        gap="$4"
        flex={1}
        jc="center"
        $gtSm={{
          width: '100%',
          maxWidth: 600,
          als: 'center',
        }}
        // $gtSm={{ width: 500, mx: 'auto' }}
        $sm={{ jc: 'space-between' }}
        {...props}
      />
    </FormWrapperContext.Provider>
  );
});

const Body = forwardRef<TamaguiElement, YStackProps>(function Body(props, ref) {
  return (
    <ScrollView>
      <YStack p="$4" ref={ref} gap="$2" pb="$8" {...props} />
    </ScrollView>
  );
});

/**
 * on native, this will be pushed to the bottom of the screen
 */
const Footer = forwardRef<TamaguiElement, YStackProps>(function Footer(
  props,
  ref
) {
  return (
      <YStack
        ref={ref}
        pb="$4"
        px="$4"
        gap="$4"
        // reverse the direction so that the primary button is on the bottom of the screen on mobile
        flexDirection="column-reverse"
        {...props}
      />
  );
});

export const FormWrapper = withStaticProperties(Wrapper, {
  Body,
  Footer,
});

export default FormWrapper;
