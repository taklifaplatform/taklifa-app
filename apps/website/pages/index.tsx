import { YStack, XStack } from 'tamagui';
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

export function Index() {
  return (
    <>
      <XStack justifyContent="center" minWidth={1296}>
        <YStack backgroundColor="$gray2" flex={1} maxWidth={1296} minWidth={
          1200
        } padding="$4">
          <TopHeader />
          <Header />
          <TopBanner />
          <TrackShipments />
          <SecondBanner />
          <ManageShipments />
          <StartToday />
          <Accredited />
          <WarningBanner />
          <Questions />
          <Footer/>
        </YStack>
      </XStack>
    </>
  );
}

export default Index;
