import React, { useState } from 'react';
import styled from 'styled-components';

const WordGame = styled.div`

    input {
        width: 50px;
        height: 50px;
        font-size: 40px;
        text-align: center;
    }

`

function Worldle() {
    const [check, setChecked] = useState(["0", "1", "2", "3", "4"])

    let answer = 'abcde';

    // const checkWord = 


  return (
    <WordGame>
        <input className='input'></input>
        <input className='input'></input>
        <input className='input'></input>
        <input className='input'></input>
        <input className='input'></input>
        <button >얍 !</button>
    </WordGame>
  );
}

export default Worldle;
