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
    const [done, setDone] = useState('')
    const [text, setText] = useState("")

    const onChange = (e) => {
      setText(e.target.value);
    };

    console.log(text);
    console.log(check)

    let answer = 'abcde';


  return (
    <WordGame>
        <input onChange={onChange} className='input'></input>
        <input onChange={onChange} className='input'></input>
        <input onChange={onChange} className='input'></input>
        <input onChange={onChange} className='input'></input>
        <input onChange={onChange} className='input'></input>
        <button >얍 !</button>
    </WordGame>
  );
}

export default Worldle;
