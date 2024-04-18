import { Partner } from '../components/web-home/partner/partner';
import { ManageShipments } from '../components/web-home/management-shipments/manage-shipments';
import { Questions } from '../components/web-home/questions/questions';
import { SecondBanner } from '../components/web-home/second-banner/second-banner';
import { StartToday } from '../components/web-home/start-today/start-today';
import { TopBanner } from '../components/web-home/top-banner/top-banner';
import { TrackShipments } from '../components/web-home/track-shipments/track-shipments';
import { WarningBanner } from '../components/web-home/warning-banner/warning-banner';
import MainLayout from '../layouts/main-layout';
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
