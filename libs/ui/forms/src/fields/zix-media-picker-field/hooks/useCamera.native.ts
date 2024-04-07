import { Camera } from 'expo-camera';

export function useCamera() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  return {
    permission,
    requestPermission,
  };
}
