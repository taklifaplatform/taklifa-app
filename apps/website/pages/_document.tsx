import Document, {
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { StyleSheet } from 'react-native'


import Tamagui from '../tamagui.config'

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage()

    // @ts-expect-error RN doesn't have this type
    const rnwStyle = StyleSheet.getSheet()

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
              __html: Tamagui.getCSS(),
            }}
          />
        </>
      ),
    }
  }

  render() {
    return (
      <Html dir='ltr'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
