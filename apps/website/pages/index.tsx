import { Partner } from '../components/web-home/partner/Partner';
import { ManageShipments } from '../components/web-home/management-shipments/ManageShipments';
import { Questions } from '../components/web-home/questions/Questions';
import { SecondBanner } from '../components/web-home/second-banner/SecondBanner';
import { StartToday } from '../components/web-home/start-today/StartToday';
import { TopBanner } from '../components/web-home/top-banner/TopBanner';
import { TrackShipments } from '../components/web-home/track-shipments/TrackShipments';
import { WarningBanner } from '../components/web-home/warning-banner/WarningBanner';
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
      <Partner />
      <WarningBanner />
      <Questions />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
