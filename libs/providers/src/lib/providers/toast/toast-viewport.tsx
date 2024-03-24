import { ToastViewport as ToastViewportOg } from '@tamagui/toast';

export interface ToastViewportProps {
  noSafeArea?: boolean;
}

export const ToastViewport: React.FC<ToastViewportProps> = ({ noSafeArea }) => {
  return (
    <ToastViewportOg
      left={noSafeArea ? 0 : 10}
      right={noSafeArea ? 0 : 10}
      top={noSafeArea ? 0 : 10}
    />
  );
};

export default ToastViewport;
