import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Worldle from './games/Wordle';

const GlobalStyle = createGlobalStyle`
  body {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    display:flex;
    justify-content: center;
    align-items: center;
  }

`
  


function GameBox() {
  return (
    <div className="App">
      <GlobalStyle/>
      <Worldle/>
    </div>
  );
}

export default GameBox;
