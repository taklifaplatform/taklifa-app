import { ShipmentsListingScreen } from '@zix/features/customer-dashboard';
import { AppHeader } from '@zix/ui/layouts';

// https://www.figma.com/file/2hwhnxKlAlXCt9EiP5tEb4/SAWAAD?type=design&node-id=2327-12534&mode=design&t=qL3wyztSyKaOgoFi-4
export default function Screen() {
  return (
    <>
      <AppHeader title="Orders" />

      <ShipmentsListingScreen />
    </>
  );
}
