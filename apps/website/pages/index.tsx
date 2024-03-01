import { Accredited } from '../components/Accredited';
import { ManageShipments } from '../components/ManageShipments';
import { Questions } from '../components/Questions';
import { SecondBanner } from '../components/SecondBanner';
import { StartToday } from '../components/StartToday';
import { TopBanner } from '../components/TopBanner';
import { TrackShipments } from '../components/TrackShipments';
import { WarningBanner } from '../components/Warning';
import { WarningMobileBanner } from '../components/WarningMobile';
import MainLayout from '../layouts/MainLayout';
import { NextPageWithLayout } from './_app';

export const Page: NextPageWithLayout = () => {
  return (
    <>
      <TopBanner />
      <TrackShipments />
      <SecondBanner />
      <ManageShipments />
      <StartToday />
      {/*<Accredited />
      <WarningBanner />
      <WarningMobileBanner />
      <Questions /> */}
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
