import { SafeAreaView } from 'react-native-safe-area-context';


export type ChatLayoutProps = {
  children?: React.ReactNode;
};

export const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      {children}
    </SafeAreaView>
  );
};
