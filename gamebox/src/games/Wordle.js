import React, { useState, useEffect } from 'react';
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
    const [check, setChecked] = useState([''])
    const [idx, setIdx] = useState(0)
    const [text, setText] = useState("")

    const onChange = (e, idx) => {
      setText(e.target.value);
      setIdx(idx)
    };

    useEffect(() => {
      console.log(text)
      console.log(idx)
      console.log(check)
    });

    


    let answer = 'abcde';
    //문자열에 인덱스 순서로 넣어줘야하는데
    //애초에 빈문자열이면 4번째 인덱스에 넣을 수가 없음
    
    // const correctWord = () => {
    //   if(check)
    // }


  return (
    <WordGame>
        <input onChange={(e, idx) => onChange(e, 0)} className='input'></input>
        <input onChange={(e, idx) => onChange(e, 1)} className='input'></input>
        <input onChange={(e, idx) => onChange(e, 2)} className='input'></input>
        <input onChange={(e, idx) => onChange(e, 3)} className='input'></input>
        <input onChange={(e, idx) => onChange(e, 4)} className='input'></input>
        <button >얍 !</button>
    </WordGame>
  );
}

export default Worldle;
