import { CarFront, Plus, Users, UsersRound } from '@tamagui/lucide-icons';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { useRef } from 'react';
import { Button, Theme } from 'tamagui';

import { useRouter } from 'solito/router';
import { USER_ROLES, useAuth } from '@zix/services/auth';

export const ManageTeamFabButton: React.FC = () => {
  const router = useRouter();
  const { getUrlPrefix } = useAuth()
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const renderFabButton = () => (
    <Theme name='accent'>
      <Button
        position="absolute"
        width="$5"
        height="$5"
        size="$5"
        bottom="$3"
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
            router.push(`${getUrlPrefix}/company/employees/invite?role=${USER_ROLES.company_manager}`);
          },
        },
        {
          name: 'Drivers',
          icon: <Users size="$2" color="$color10" />,
          onPress: () => {
            actionSheetRef.current?.close();
            router.push(`${getUrlPrefix}/company/employees/invite?role=${USER_ROLES.company_driver}`);
          },
        },
        {
          name: 'Vehicle',
          icon: <CarFront size="$2" color="$color10" />,
          onPress: () => {
            actionSheetRef.current?.close();
            alert('UNDER DEVELOPMENT');
            // router.push(`/company/admin/vehicles/create`);
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
