import { ManageShipments } from '../components/web-home/management-shipments/manage-shipments';
import { OurPartners } from '../components/web-home/our-partners/our-partners';
import { FrequentlyQuestions } from '../components/web-home/questions/frequently-question';
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
      <OurPartners />
      <WarningBanner />
      <FrequentlyQuestions />
    </>
  );
};

Page.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Page;
