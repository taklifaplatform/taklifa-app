import { useEffect } from 'react';
import { mixpanel } from './mixpanel';

export function useMixpanel(eventName: string) {
    useEffect(() => {
        mixpanel.track(eventName)
    }, [])
}