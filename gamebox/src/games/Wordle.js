// import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WordGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 15px;

`
const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;

  border-bottom: 1px solid #929292;

  font-weight: 500;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  
`;

const GameSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  height: 380px;
  width: 330px;
  margin-top: 10px;
`;

const KeyRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const Key = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #929292;
  /* border: 2px solid #8edb72; */
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.2rem;
  border-radius: 5px;
  text-transform: uppercase;
  /* &:nth-child(2n){
    border: 2px solid #e37c5d;
  } */
`;

const Keyboard = styled.section`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const KeyboardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  flex: 1;
  border: 0;
  border-radius: 4px;
  background-color: #818384;
  font-weight: bold;
  text-transform: uppercase;
  color: #d7dadc;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`;

function Worldle() {
    


  return (
    <WordGame>
       <Title>🥕 My TORDLE 🐇</Title>
       <GameSection>
        <Board>
          {[0, 1, 2, 3, 4, 5].map((el) => (
            <KeyRow key={el}>
              {[0, 1, 2, 3, 4].map((el) => (
                <Key key={el}></Key>
              ))}
            </KeyRow>
          ))}
        </Board>
      </GameSection>
      <Keyboard>
        <KeyboardRow>
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((el) => (
            <KeyboardButton>{el}</KeyboardButton>
          ))}
        </KeyboardRow>
        <KeyboardRow>
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((el) => (
            <KeyboardButton>{el}</KeyboardButton>
          ))}
        </KeyboardRow>
        <KeyboardRow>
          {["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"].map(
            (el) => (
              <KeyboardButton>{el}</KeyboardButton>
            )
          )}
        </KeyboardRow>
      </Keyboard>
    </WordGame>
  );
}

export default Worldle;
