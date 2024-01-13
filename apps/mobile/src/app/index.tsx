/* eslint-disable jsx-a11y/accessible-emoji */
import { api } from '@zix/api';
import { useSupabase } from '@zix/core/supabase';
import { Tables } from '@zix/supabase';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'tamagui';

export default function Screen() {
  const supabase = useSupabase();
  const { data: countriesData } = api.countries.get.useQuery();

  const [countries, setCountries] = useState<Tables<'countries'>>();

  useEffect(() => {
    async function fetchCountries() {
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

  return (
    <View style={styles.section}>
      <Text style={styles.textLg}>Hello there,</Text>
      <Text style={[styles.textXL, styles.appTitleText]} testID="heading">
        Welcome Demo 👋
        {JSON.stringify(countriesData)}
      </Text>
      <Button onPress={() => router.push('/auth/login')}>
        <Text>Open Login Flox</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff'
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4
  },
  comment: {
    color: '#cccccc'
  },
  marginBottomSm: {
    marginBottom: 6
  },
  marginBottomMd: {
    marginBottom: 18
  },
  marginBottomLg: {
    marginBottom: 24
  },
  textLight: {
    fontWeight: '300'
  },
  textBold: {
    fontWeight: '500'
  },
  textCenter: {
    textAlign: 'center'
  },
  text2XS: {
    fontSize: 12
  },
  textXS: {
    fontSize: 14
  },
  textSm: {
    fontSize: 16
  },
  textMd: {
    fontSize: 18
  },
  textLg: {
    fontSize: 24
  },
  textXL: {
    fontSize: 48
  },
  textContainer: {
    marginVertical: 12
  },
  textSubtle: {
    color: '#6b7280'
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500'
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row'
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24
  },
  learning: {
    marginVertical: 12
  },
  love: {
    marginTop: 12,
    justifyContent: 'center'
  }
});
