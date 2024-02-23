import {
  ToastProvider as ToastProviderOG
} from '@tamagui/toast';
import { PortalProvider } from 'tamagui';

import {
  CustomToast,
} from './custom-toast/custom-toast';
import { ToastViewport, ToastViewportProps } from './toast-viewport';

/**
 * ToastProvider component provides a toast notification system for displaying messages to the user.
 *
 * @component
 * @param children - The content to be rendered inside the ToastProvider.
 * @param viewportProps - Additional props for the ToastViewport component.
 * @returns The rendered ToastProvider component.
 */
export const ToastProvider: React.FC<
  { children: React.ReactNode } & ToastViewportProps
> = ({ children, ...viewportProps }) => {
  return (
    <PortalProvider>
      <ToastProviderOG
        swipeDirection="up"
        swipeThreshold={20}
        duration={6000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile - note that it won't be as customizable as custom toasts, especially on android */
            // 'mobile'
          ]
        }
      >
        {children}
        <ToastViewport {...viewportProps} />
        <CustomToast />
      </ToastProviderOG>
    </PortalProvider>
  );
};

export default ToastProvider;
