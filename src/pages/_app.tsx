// Next
import type { AppProps } from 'next/app';

// React
import type { ReactElement } from "react";

// Style
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />
};

export default App