import { User } from '@supabase/supabase-js';
import {
  Building2,
  CarFront,
  ChevronDown,
  PlusSquare,
  User as UserIcon
} from '@tamagui/lucide-icons';
import { Tables } from '@zix/core/supabase';
import { useState } from 'react';
import { useRouter } from 'solito/router';
import { H3, ListItem, Sheet, XStack, YGroup } from 'tamagui';

export type DashboardSwitcherProps = {
  user?: User;
  companies?: Tables<'companies'>[];
};

export const DashboardSwitcher: React.FC<DashboardSwitcherProps> = ({
  user,
  companies
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();

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
        <H3>{user?.user_metadata?.name}</H3>
        <ChevronDown size="$2" />
      </XStack>

      <Sheet
        native
        modal
        snapPointsMode="fit"
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
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
            {companies?.map((company: Tables<'companies'>) => (
              <YGroup.Item key={company.name}>
                <ListItem
                  onPress={() => onNavigate(`/companies/${company.id}`)}
                  marginVertical="$2"
                  paddingVertical="$4"
                  hoverTheme
                  icon={Building2}
                  title={company.name}
                  // subTitle={item.subTitle}
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
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default DashboardSwitcher;
