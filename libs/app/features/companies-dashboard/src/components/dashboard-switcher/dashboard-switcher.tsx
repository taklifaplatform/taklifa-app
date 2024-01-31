import {
  Building2,
  CarFront,
  ChevronDown,
  PlusSquare,
  User as UserIcon
} from '@tamagui/lucide-icons';
import { H3, ListItem, Sheet, Text, XStack, YGroup } from '@zix/app/ui/core';
import { useUser } from '@zix/core/auth';
import { useState } from 'react';
import { useRouter } from 'solito/router';
import { useCompanyManagerContext } from '../../context/UseCompanyManagerContext';

export type DashboardSwitcherProps = {
  //
};

export const DashboardSwitcher: React.FC<DashboardSwitcherProps> = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const { profile, user } = useUser();
  const { companies, switchCompany } = useCompanyManagerContext();

  const dashboard = [
    {
      name: 'Customer',
      icon: UserIcon,
      route: '/customer'
    },
    {
      name: 'Solo Driver',
      icon: CarFront,
      route: '/solo-driver'
    }
  ];

  function onNavigate(route: string, replace = true) {
    setSheetOpen(false);
    if (replace) {
      router.replace(route);
      return;
    }
    router.push(route);
  }

  return (
    <>
      <XStack alignItems="center" gap="$2" onPress={() => setSheetOpen(true)}>
        <Text fontWeight="bold" fontSize={15} numberOfLines={1}>
          {profile?.name || user?.user_metadata?.name}
        </Text>
        <ChevronDown size="$1" />
      </XStack>

      <Sheet
        native
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[50, 85]}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
          <Sheet.ScrollView>
            <YGroup marginBottom="$4">
              <H3 padding="$4">Switch Dashboard</H3>
              {dashboard.map((item) => (
                <YGroup.Item key={item.name}>
                  <ListItem
                    onPress={() => onNavigate(item.route)}
                    marginVertical="$2"
                    paddingVertical="$4"
                    hoverTheme
                    icon={Building2}
                    title={item.name}
                  />
                </YGroup.Item>
              ))}
              <H3 padding="$4">Companies</H3>
              {companies?.map((company) => (
                <YGroup.Item key={company.name}>
                  <ListItem
                    onPress={() => {
                      switchCompany(company.id);
                      onNavigate(`/companies/${company.id}`);
                    }}
                    marginVertical="$2"
                    paddingVertical="$4"
                    hoverTheme
                    icon={Building2}
                    title={company.name}
                  />
                </YGroup.Item>
              ))}
              <YGroup.Item>
                <ListItem
                  onPress={() => onNavigate('/companies/create', false)}
                  marginVertical="$2"
                  paddingVertical="$4"
                  hoverTheme
                  icon={PlusSquare}
                  title="Create New Company"
                />
              </YGroup.Item>
            </YGroup>
          </Sheet.ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default DashboardSwitcher;
