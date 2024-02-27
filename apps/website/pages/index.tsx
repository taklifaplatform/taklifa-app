import { YStack, Stack, Sheet } from 'tamagui';
import { TopHeader } from '../components/TopHeader';
import { Header } from '../components/Header';
import { TopBanner } from '../components/TopBanner';
import { TrackShipments } from '../components/TrackShipments';
import { SecondBanner } from '../components/SecondBanner';
import { ManageShipments } from '../components/ManageShipments';
import { StartToday } from '../components/StartToday';
import { Accredited } from '../components/Accredited';
import { WarningBanner } from '../components/Warning';
import { Questions } from '../components/Questions';
import { Footer } from '../components/Footer';
import { MobileHeader } from '../components/MobileHeader';
import { ManageShipmentsMobile } from '../components/ManageShipmentsMobile';
import { WarningMobileBanner } from '../components/WarningMobile';
import { MobileFooter } from '../components/MobileFooter';
import { useState } from 'react';
import { MobileDrawer } from '../components/MobileDrawer';

export function Index() {
  const [drawer, setDrawer] = useState(false)
  return (
    <>
      <Stack flex={1} justifyContent="center" flexDirection='row' $sm={
        {
          flexDirection: 'column',
          alignItems: 'center'
        }
      }>
        <YStack  width='90%' padding="$4"
        >
          <TopHeader />
          <Header />
          <MobileHeader
            drawer={drawer}
            setDrawer={setDrawer}
          />
          <TopBanner />
          <TrackShipments />
          <SecondBanner />
          <ManageShipments />
          <ManageShipmentsMobile />
          <StartToday />
          <Accredited />
          <WarningBanner />
          <WarningMobileBanner />
          <Questions />
          <Footer />
          <MobileFooter />

        </YStack>
        <Sheet
        snapPoints={[90, 50]}
        open={drawer}>
          <Sheet.Overlay onPress={() => setDrawer(!drawer)} />
          <Sheet.Handle />
          <Sheet.Frame>
            <MobileDrawer />
          </Sheet.Frame>
        </Sheet>
      </Stack>
    </>
  );
}

export default Index;
