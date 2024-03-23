
import { CombinedChatScreen } from '@zix/features/chat';
import { AppLayout } from '@zix/ui/layouts';
import { NextPageWithLayout } from '../_app';

export const Page: NextPageWithLayout = () => {
  return (
    <CombinedChatScreen />
  );
}


Page.getLayout = (page) => <AppLayout>{page}</AppLayout>

// export const getServerSideProps = userProtectedGetSSP()

export default Page
