import type { AppProps } from 'next/app'
import { TinaEditProvider } from 'tinacms/dist/edit-state'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TinaEditProvider editMode={pageProps.__tina_editing_enabled}>
      <Component {...pageProps} />
    </TinaEditProvider>
  )
}
