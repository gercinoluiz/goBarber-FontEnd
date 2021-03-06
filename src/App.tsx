import React from 'react';

import GlobalStyle from "./styles/index"   // It must have this name due to the exportatio function


import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
  </>

)

export default App;
