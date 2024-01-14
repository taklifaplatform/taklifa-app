import { api } from '@zix/app/api';
import { Button } from 'tamagui';

export function Index() {
  const { data } = api.countries.get.useQuery();

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.none file.
   */
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome website 👋
            </h1>
            <Button>Hello world</Button>
            {JSON.stringify(data)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
