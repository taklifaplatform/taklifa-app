import { AnimatePresence, Paragraph } from 'tamagui';

type FieldErrorProps = {
  /**
   * error will be hidden if undefined
   */
  message?: string;
};

/**
 * Renders an error message for a form field.
 *
 * @component
 * @param {FieldErrorProps} props - The props for the FieldError component.
 * @param {string} props.message - The error message to display.
 * @returns {JSX.Element} The rendered FieldError component.
 */
export const FieldError: React.FC<FieldErrorProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {!!message && (
        <Paragraph
          key="error"
          // animation="200ms"
          mt="$2"
          theme="alt2"
          enterStyle={{
            y: -4,
            scaleY: 0.2,
            opacity: 0,
          }}
          exitStyle={{
            y: -4,
            opacity: 0,
            scaleY: 0,
          }}
          opacity={1}
          y={0}
          scaleY={1}
        >
          {message}
        </Paragraph>
      )}
    </AnimatePresence>
  );
};

export default FieldError;
