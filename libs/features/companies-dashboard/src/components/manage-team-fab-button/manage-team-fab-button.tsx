import { CarFront, Plus, Users, UsersRound } from '@tamagui/lucide-icons';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { Button, Theme } from 'tamagui';
import { useRef } from 'react';

import { useRouter } from 'solito/router';
import { useCompanyManagerContext } from '../../context/UseCompanyManagerContext';

export const ManageTeamFabButton: React.FC = () => {
  const router = useRouter();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { activeCompany } = useCompanyManagerContext();

  const renderFabButton = () => (
    <Theme>
      <Button
        position="absolute"
        width="$5"
        height="$5"
        size="$5"
        bottom="$10"
        right="$3"
        icon={<Plus size="$2.5" />}
        borderRadius="$10"
        onPress={() => {
          console.log('open action sheet');
          actionSheetRef.current?.open();
        }}
      />
    </Theme>
  );

  const renderActionSheetForAdd = () => (
    <ActionSheet
      modal={false}
      ref={actionSheetRef}
      title="Add"
      actions={[
        {
          name: 'Manager',
          icon: <UsersRound size="$2" color="$color10" />,
          onPress: () => {
            actionSheetRef.current?.close();
            alert('UNDER DEVELOPMENT');
            // router.push(`/companies/${activeCompany?.id}/admin/managers/create`);
          },
        },
        {
          name: 'Drivers',
          icon: <Users size="$2" color="$color10" />,
          onPress: () => {
            actionSheetRef.current?.close();
            router.push(
              `/companies/${activeCompany?.id}/manage/drivers/invite`
            );
          },
        },
        {
          name: 'Vehicle',
          icon: <CarFront size="$2" color="$color10" />,
          onPress: () => {
            actionSheetRef.current?.close();
            alert('UNDER DEVELOPMENT');
            // router.push(`/companies/${activeCompany?.id}/admin/vehicles/create`);
          },
        },
      ]}
    />
  );

  return (
    <>
      {renderFabButton()}
      {renderActionSheetForAdd()}
    </>
  );
};

export default ManageTeamFabButton;
