import '../styles/global.css'
import '../node_modules/react-quill/dist/quill.snow.css'
import '../node_modules/nprogress/nprogress.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}