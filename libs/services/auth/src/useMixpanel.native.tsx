import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { mixpanel } from './mixpanel';

export function useMixpanel(eventName: string) {
    useFocusEffect(
        useCallback(() => {
            mixpanel.track(eventName)
        }, [])
    )
}