import { Partner } from '../components/web-home/partner';
import { ManageShipments } from '../components/web-home/management-shipments';
import { Questions } from '../components/web-home/questions';
import { SecondBanner } from '../components/web-home/second-banner';
import { StartToday } from '../components/web-home/start-today';
import { TopBanner } from '../components/web-home/top-banner';
import { TrackShipments } from '../components/web-home/track-shipments';
import { WarningBanner } from '../components/web-home/warning-banner';
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
