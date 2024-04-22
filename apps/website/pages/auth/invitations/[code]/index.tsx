import { AuthLayout, InvitationScreen, guestOnlyGetSSP } from '@zix/features/auth';
import Head from 'next/head';
import { NextPageWithLayout } from '../../../_app';

export const Page: NextPageWithLayout = () => (
    <>
        <Head>
            <title>Invitation</title>
        </Head>
        <InvitationScreen />
    </>
);

Page.getLayout = (children) => <AuthLayout>{children}</AuthLayout>;

export const getServerSideProps = guestOnlyGetSSP();

export default Page;
