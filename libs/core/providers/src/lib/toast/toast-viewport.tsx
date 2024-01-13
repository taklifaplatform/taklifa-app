import { ToastViewport as ToastViewportOg } from '@zix/core/ui';

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
