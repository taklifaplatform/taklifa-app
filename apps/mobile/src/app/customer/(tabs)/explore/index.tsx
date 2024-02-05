import { api } from '@zix/api';
import { AppHeader } from '@zix/app/ui/common';
import { View, Text, Button } from '@zix/app/ui/core';
import React from 'react';

import { t } from 'i18next';

export default function Screen() {
  const { mutate } = api.manageCompanyMembers.invite.useMutation()
  return (
    <>
      <AppHeader showBackButton title="Chat" />
      <View p='$4'>
        <Text>Chat</Text>
        <Button onPress={() => mutate({
          company_id: '1',
          name: 'John Doe',
          phone: '21622074426',
          role: 'driver',
          message: t("invite:company-member", { name: 'John Doe', company: "ABC" })
            .toString()
        })}>
          Invite
        </Button>
      </View >
    </>
  );
}
