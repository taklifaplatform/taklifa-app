import { SafeAreaView } from 'react-native-safe-area-context';

export type AppHeaderWrapperProps = {
  children: React.ReactNode;
}

export const AppHeaderWrapper: React.FC<AppHeaderWrapperProps> = ({
  children
}) => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  )
}
