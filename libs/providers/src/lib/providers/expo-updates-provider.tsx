import { ZixButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import * as Updates from 'expo-updates';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Text, Theme, YStack } from 'tamagui';


export type ExpoUpdatesProviderProps = {
    children: React.ReactNode;
}
export const ExpoUpdatesProvider = ({ children }: ExpoUpdatesProviderProps) => {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onFetchUpdateAsync() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                setUpdateAvailable(true);
            }
            return;
        } catch (error: any) {
            setError(error?.message || 'Unknown error');
            alert(error?.message || 'TMP: ATA Unknown error');
            return;
        }
        alert('ATA Not Found');
    }

    useEffect(() => {
        onFetchUpdateAsync();
    }, []);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await Updates.reloadAsync();
        } catch (error: any) {
            setError(error?.message || 'Unknown error');
            setLoading(false);
        }
    };

    if (updateAvailable) {
        return (
            <YStack theme="dark" flex={1} backgroundColor='$color1' justifyContent="center" alignItems="center" padding={24} gap={16}>
                <Theme name='accent'>
                    <CustomIcon name="logo" size='$10' color="$color1" />
                </Theme>
                <Text fontSize={20} fontWeight="bold">
                    {t('expo-updates:new-update-available')}
                </Text>
                <Text textAlign="center">{t('expo-updates:new-update-available-description')}</Text>
                {error && <Text color="red">{error}</Text>}
                <ZixButton onPress={handleConfirm} loading={loading}>
                    {t('expo-updates:confirm-and-restart')}
                </ZixButton>
            </YStack>
        );
    }

    return children;
}

export default ExpoUpdatesProvider;
