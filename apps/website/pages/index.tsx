import { useEffect, useState } from 'react';

import { useSupabase } from '@zix/core/api';
import { api } from '@zix/api';
import { Tables } from '@zix/supabase';
import { Button } from 'tamagui';

export function Index() {
  const supabase = useSupabase();

  const countriesQuery = api.countries.get.useQuery();

  const [countries, setCountries] = useState<Tables<'countries'>>();

  useEffect(() => {
    async function fetchCountries() {
      console.log('=============');
      console.log('fetchCountries->supabase:', Object.keys(supabase));
      console.log('=============');
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .limit(10);
      if (error) {
        console.error(error);
      } else {
        setCountries(data);
      }
    }
    fetchCountries();
  }, [supabase]);
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
            {JSON.stringify(countriesQuery?.data)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
