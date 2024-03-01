import { useConfiguration } from '@tamagui/web';
import { Stack } from 'tamagui';
import { useEffect } from 'react';

export type ShakeProps = {
  /**
   * animated the container when this value changes and reset when it's undefined
   * one great use-case is the error message of a field
   */
  shakeKey?: string;
  /**
   * @default 4
   */
  shakeTimes?: number;
  /**
   * @default 5
   */
  shakeDistance?: number;
  children: React.ReactNode;
};

/**
 * Shake component that applies a shaking animation to its children.
 *
 * @component
 * @param {ShakeProps} props - The props for the Shake component.
 * @param {string} props.shakeKey - The key used to trigger the shaking animation.
 * @param {number} [props.shakeTimes=4] - The number of times the component shakes.
 * @param {number} [props.shakeDistance=3] - The distance the component shakes.
 * @param {ReactNode} props.children - The children components to be animated.
 * @returns {ReactNode} The Shake component.
 * @throws {Error} If no animation driver is found.
 */
export const Shake: React.FC<ShakeProps> = ({
  shakeKey,
  shakeTimes = 4,
  shakeDistance = 3,
  children,
}) => {
  const { animationDriver } = useConfiguration();
  if (!animationDriver) throw new Error('No animation driver found.');
  const {
    useAnimatedNumber,
    useAnimatedNumberStyle,
    View: AnimatedView,
  } = animationDriver;
  const animatedNumber = useAnimatedNumber(0);

  useEffect(() => {
    if (!shakeKey) {
      animatedNumber.setValue(0);
    } else {
      const timeouts = Array.from(Array(shakeTimes)).map((_, idx, arr) =>
        setTimeout(
          () =>
            animatedNumber.setValue(
              idx + 1 === arr.length
                ? 0
                : (idx + 1) % 2 === 0
                  ? -shakeDistance
                  : shakeDistance
            ),
          100 * idx
        )
      );
      return () => {
        for (const timeout of timeouts) {
          clearTimeout(timeout);
        }
      };
    }
  }, [animatedNumber, shakeDistance, shakeKey, shakeTimes]);

  const animatedStyle = useAnimatedNumberStyle(animatedNumber, (val) => {
    'worklet';
    return {
      transform: [{ translateX: val }],
    };
  });

  // return <Stack animation={shakeKey ? 'bouncy' : undefined}>{children}</Stack>;

  return <AnimatedView style={animatedStyle}>{children}</AnimatedView>;
};

export default Shake;
