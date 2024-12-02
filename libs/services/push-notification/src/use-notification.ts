import { useRouter } from 'solito/router';

export function useNotification() {
  const router = useRouter();

  function handleNotificationRedirection(data: any) {
    console.log(
      'handleNotificationRedirection::',
      JSON.stringify(data, null, 2),
    );

    switch (data?.type) {
      case 'DriverShipmentNewInvitationNotification':
        router.push(`/app/shipments/${data.model_id}`);
        break;
      default:
        break;
    }
  }
  return {
    handleNotificationRedirection,
  };
}
