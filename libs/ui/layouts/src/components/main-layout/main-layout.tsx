import { Menu } from '@tamagui/lucide-icons'
import {
  Adapt,
  Button,
  Popover,
  Separator,
  SizableText,
  StackProps,
  XStack,
  YStack,
  Text,
  useThemeName
} from 'tamagui'
import { useRouter as useNextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Link } from 'solito/link'

import { useRouter } from 'solito/router'
import { NavTabs } from './nav-tabs'
import { CustomIcon } from '@zix/ui/icons'
import { useAuth } from '@zix/utils'
import { UserAvatar } from '@zix/ui/common'

export type MainLayoutProps = {
  children?: React.ReactNode
  padded?: boolean
  fullPage?: boolean
  headerFixed?: boolean
}

export const MainLayout = ({ children, fullPage = false, padded = false, headerFixed = false }: MainLayoutProps) => {
  return (
    <YStack flex={1}>
      <YStack
        gap="$4"
        justifyContent="center"
        paddingHorizontal="$4"
        backgroundColor="$color1"
        // @ts-ignore
        {...(headerFixed && { position: 'sticky', top: 0, zIndex: 100000000 } as unknown)}

      >
        <XStack justifyContent="space-between" alignItems='center' paddingVertical="$3">
          <YStack $sm={{ display: 'none' }}>
            <XStack gap="$5" alignItems='center'>
              <CustomIcon name="logo" width={140} height={60} />
              <NavTabs orientation="horizontal" size="$4" />
            </XStack>
          </YStack>
          <YStack $gtSm={{ display: 'none' }}>
            <MobileNavbar>
              <YStack gap="$5" width="100%" alignItems="flex-end">
                <NavTabs orientation="vertical" flex={1} width="100%" size="$3" />
                <Separator width="100%" />
                <WithUserDetail alignItems="center" gap="$4">
                  <ProfileButton />
                </WithUserDetail>
              </YStack>
            </MobileNavbar>
          </YStack>
          <ProfileButton />
        </XStack>
      </YStack>

      <YStack
        {...(fullPage && { flex: 1 })}
        {...(padded && {
          maw: 1124,
          mx: 'auto',
          px: '$2',
          w: '100%',
        })}
      >
        {children}
      </YStack>
    </YStack>
  )
}


export const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const router = useNextRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])
  const themeName = useThemeName()
  return (
    <Popover open={open} onOpenChange={setOpen} size="$5" stayInFrame={{ padding: 20 }}>
      <Popover.Trigger asChild>
        <Button
          chromeless
          padding="$2"
          onPress={() => setOpen(!open)}
          theme={open ? 'alt1' : themeName}
          icon={<Menu size={32} />}
        />
      </Popover.Trigger>

      <Adapt
        platform="web"
        when="sm"
      >
        <Popover.Sheet zIndex={100000000} modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame>
            <Popover.Sheet.ScrollView>
              <Adapt.Contents />
            </Popover.Sheet.ScrollView>
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay zIndex={100} />
        </Popover.Sheet>
      </Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ x: 0, y: -10, opacity: 0 }}
        exitStyle={{ x: 0, y: -10, opacity: 0 }}
        x={0}
        y={0}
        opacity={1}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        padding={0}
        // mah={validToken('80vh')}
        elevate
        zIndex={100000000}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        <Popover.ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <YStack minWidth={230} padding="$3" alignItems="flex-end">
            {children}
          </YStack>
        </Popover.ScrollView>
      </Popover.Content>
    </Popover>
  )
}


const ProfileButton = () => {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <XStack>
        <Button onPress={() => router.push('/auth/login')} themeInverse borderRadius='$4' size='$3' paddingHorizontal="$4">
          Login
        </Button>
      </XStack>
    )
  }

  return (
    <Link href="/account">
      <XStack alignItems='center' gap='$2' borderWidth='$0.5' borderRadius='$4' paddingVertical='$2' paddingHorizontal='$4'>
        <Text fontWeight='600'> Welcome, </Text>
        <Text> {user?.name || user?.phone_number} </Text>
        <UserAvatar size='$2' user={user} />
      </XStack>
    </Link>
  )
}

const WithUserDetail = ({ children, ...props }: StackProps) => {
  const { user } = useAuth()

  return (
    <XStack gap="$2" {...props}>
      <YStack alignItems="flex-end">
        <SizableText size="$5">{user?.name}</SizableText>
        <SizableText theme="alt1">{user?.phone_number}</SizableText>
      </YStack>
      {children}
    </XStack>
  )
}
