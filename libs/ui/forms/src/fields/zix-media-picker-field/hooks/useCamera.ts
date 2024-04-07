export function useCamera() {
  return {
    permission: {},
    requestPermission: () => console.log('requestPermission'),
  };
}
