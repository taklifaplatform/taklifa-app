import React, { useEffect } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAttachmentPickerContext, useTheme } from 'stream-chat-expo';

import { UnreadCountBadge } from './UnreadCountBadge';

import { useRouter } from 'solito/router';
import { GoBack } from '../icons/GoBack';

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 8,
  },
  backButtonUnreadCount: {
    left: 25,
    position: 'absolute',
  },
  centerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  leftContainer: {
    width: 70,
  },
  rightContainer: {
    alignItems: 'flex-end',
    width: 70,
  },
  subTitle: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export const BackButton: React.FC<{
  onBack?: () => void;
  showUnreadCountBadge?: boolean;
}> = ({ onBack, showUnreadCountBadge }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.back();
        if (onBack) {
          onBack();
        }
      }}
      style={styles.backButton}
    >
      <GoBack />
      {!!showUnreadCountBadge && (
        <View style={styles.backButtonUnreadCount}>
          <UnreadCountBadge />
        </View>
      )}
    </TouchableOpacity>
  );
};

type ScreenHeaderProps = {
  titleText: string;
  inSafeArea?: boolean;
  LeftContent?: React.ElementType;
  onBack?: () => void;
  RightContent?: React.ElementType;
  showUnreadCountBadge?: boolean;
  style?: StyleProp<ViewStyle>;
  Subtitle?: React.ElementType;
  subtitleText?: string;
  Title?: React.ElementType;
};

const HEADER_CONTENT_HEIGHT = 55;

export const ScreenHeader: React.FC<ScreenHeaderProps> = (props) => {
  const {
    inSafeArea,
    LeftContent,
    onBack,
    RightContent = () => <View style={{ height: 24, width: 24 }} />,
    showUnreadCountBadge,
    style,
    Subtitle,
    subtitleText,
    Title,
    titleText = 'Stream Chat',
  } = props;

  const {
    theme: {
      colors: { black, border, grey, white },
    },
  } = useTheme();
  const insets = useSafeAreaInsets();
  const { setTopInset } = useAttachmentPickerContext();

  useEffect(() => {
    if (setTopInset) {
      setTopInset(HEADER_CONTENT_HEIGHT + insets.top);
    }
  }, [insets.top]);

  return (
    <View
      style={[
        {
          height: HEADER_CONTENT_HEIGHT + (inSafeArea ? 0 : insets.top),
        },
        style,
      ]}
    >
      <View
        style={[
          styles.contentContainer,
          {
            height: HEADER_CONTENT_HEIGHT,
            marginTop: inSafeArea ? 0 : insets.top,
          },
        ]}
      >
        <View style={styles.leftContainer}>
          {LeftContent ? (
            <LeftContent />
          ) : (
            <BackButton
              onBack={onBack}
              showUnreadCountBadge={showUnreadCountBadge}
            />
          )}
        </View>
        <View style={styles.centerContainer}>
          <View style={{ paddingBottom: !!Subtitle || !!subtitleText ? 3 : 0 }}>
            {Title ? (
              <Title />
            ) : (
              !!titleText && (
                <Text
                  style={[
                    styles.title,
                    {
                      color: black,
                    },
                  ]}
                >
                  {titleText}
                </Text>
              )
            )}
          </View>
          {Subtitle ? (
            <Subtitle />
          ) : (
            !!subtitleText && (
              <Text
                style={[
                  styles.subTitle,
                  {
                    color: grey,
                  },
                ]}
              >
                {subtitleText}
              </Text>
            )
          )}
        </View>
        <View style={styles.rightContainer}>
          <RightContent />
        </View>
      </View>
    </View>
  );
};
