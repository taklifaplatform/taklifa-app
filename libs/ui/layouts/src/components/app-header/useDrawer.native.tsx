import { useNavigation } from "expo-router";

export function useDrawer() {
  const navigation = useNavigation();

  function toggleDrawer() {
    navigation.openDrawer();
  }

  return {
    toggleDrawer
  }
}
