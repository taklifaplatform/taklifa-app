import Document, { Head, Html, Main, NextScript } from 'next/document';
import { StyleSheet } from 'react-native';

import Tamagui from '../tamagui.config';
import Script from 'next/script';
const source = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA&libraries=places`;
// const source = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage();

    // @ts-expect-error RN doesn't have this type
    const rnwStyle = StyleSheet.getSheet();

    return {
      ...page,
      styles: (
        <>
          <style
            id={rnwStyle.id}
            dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html: Tamagui.getCSS({
                // if you are using "outputCSS" option, you should use this "exclude"
                // if not, then you can leave the option out
                exclude:
                  process.env.NODE_ENV === 'production'
                    ? 'design-system'
                    : null,
              }),
            }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <Script
            type="text/javascript"
            src={source}
            strategy="beforeInteractive"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
