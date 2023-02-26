import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Worldle from './games/Wordle';

const GlobalStyle = createGlobalStyle``
  


function GameBox() {
  return (
    <div className="App">
      <GlobalStyle/>
      <Worldle/>
    </div>
  );
}

export default GameBox;
