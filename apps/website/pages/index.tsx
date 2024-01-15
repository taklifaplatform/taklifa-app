import { api } from '@zix/app/api';
import { Button, H1, Text, Theme, View } from '@zix/app/ui/core';

export function Index() {
  const { data } = api.countries.get.useQuery();

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.none file.
   */
  return (
    <>
      <Theme inverse>
        <View p="$12">
          <H1>
            <Text> Hello there, </Text>
            Welcome website 👋
          </H1>
          <Button>Hello world</Button>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      </Theme>
    </>
  );
}

export default Index;
