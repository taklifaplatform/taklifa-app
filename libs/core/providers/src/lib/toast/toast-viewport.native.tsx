import { useSafeAreaInsets } from '@zix/core/utils';
import { ToastViewport as ToastViewportOg } from '@zix/ui';
import { ToastViewportProps } from './toast-viewport';

export const ToastViewport = ({ noSafeArea }: ToastViewportProps) => {
  const { top, right, left } = useSafeAreaInsets();
  return (
    <ToastViewportOg
      top={noSafeArea ? 0 : top + 5}
      left={noSafeArea ? 0 : left + 5}
      right={noSafeArea ? 0 : right + 5}
      pointerEvents="none"
    />
  );
};
