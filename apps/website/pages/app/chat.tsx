
import { CombinedChatScreen } from '@zix/features/chat';
import { DashboardLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <CombinedChatScreen />
  );
}


Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

// export const getServerSideProps = userProtectedGetSSP()

export default Page
