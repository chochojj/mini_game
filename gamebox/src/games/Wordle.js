import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styled from 'styled-components';


const WordGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 130%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 80px;

`
const Title = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
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

  ${({ hint }) => {
    console.log("hint:", hint, hint === "green", hint === "yellow");
    if (hint === "green") {
      return `background-color: #8edb72;`;
    }
    if (hint === "yellow") {
      return `background-color: #e37c5d;`;
    }
    if (hint === "grey"){
      return `background-color: #c4c4c4;`;
    }
  }}

  user-select: none;
`;

const Keyboard = styled.section`
  height: 200px;
  width: 115%;
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
  background-color: rgba(0,0,0,0.3);
  font-weight: bold;
  text-transform: uppercase;
  color: white;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`;
const Flex = styled.div`
  ${({ item }) => `flex: ${item};`}
`;
export const ShareModal = styled.div`
  
`;

export const ShareButton = styled.button`
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 2px solid #3a3a3c;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #818384;
  }
`;

export const Heading = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px auto;
`;


const wordLength = 5;
//키보드 UI에 배열을 뿌려줌
const keyboardRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];
//뿌려주려고 만들어둔 배열의 깊이를 평탄화
const allKeys = keyboardRows.flat();
//새로 시작하는 게임의 입력칸 
const newGame = {
  0: Array.from({ length: wordLength }).fill(""),
  1: Array.from({ length: wordLength }).fill(""),
  2: Array.from({ length: wordLength }).fill(""),
  3: Array.from({ length: wordLength }).fill(""),
  4: Array.from({ length: wordLength }).fill(""),
  5: Array.from({ length: wordLength }).fill(""),
};

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

const fetchWord = (word) => {
  return fetch(`${API_URL}/${word}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log("err:", err));
};

function Worldle() {
  const answer = "apple";

  const [guesses, setGuesses] = useState({ ...newGame });
  const [checked, setChecked] = useState({
    0: Array.from({ length: wordLength }).fill(""),
    1: Array.from({ length: wordLength }).fill(""),
    2: Array.from({ length: wordLength }).fill(""),
    3: Array.from({ length: wordLength }).fill(""),
    4: Array.from({ length: wordLength }).fill(""),
    5: Array.from({ length: wordLength }).fill(""),
  });
  const [isModalVisible, setModalVisible] = useState(false);

  // console.log(guesses)
  console.log(checked)

  
  let letterIndex = useRef(0);
  let round = useRef(0);

  const win = () => {
    document.removeEventListener("keydown", handleKeyDown);
    setModalVisible(true);
  };

  const submit = () => {
    const _round = round.current;
    console.log(_round)
    const updateColor = {
      ...checked,
    };

    const curWord = answer.split("");

    const newArr = [];

    // 맞는 자리에 녹색
    curWord.forEach((letter, index) => {
      const guessedLetter = guesses[_round][index];

      if (guessedLetter === letter) {
        updateColor[_round][index] = "green";
        curWord[index] = "";
      } else {
        newArr.push(index);
      }
    });

    if (updateColor[_round].every((guess) => guess === "green")) {
      setChecked(updateColor);
      win();
      return;
    }

    //틀린 단어 찾기
    if (newArr.length) {
      newArr.forEach((index) => {
        const guessedLetter = guesses[_round][index];
        const correctPositionOfLetter = curWord.indexOf(guessedLetter);
        console.log(newArr)
        if (
          curWord.includes(guessedLetter) &&
          correctPositionOfLetter !== index
        ) {
          // 틀린자리에 노란색
          updateColor[_round][index] = "yellow";
          curWord[correctPositionOfLetter] = "";
        } else {
          // 없는 자리에 회색
          updateColor[_round][index] = "grey";
        }
      });
    }

    setChecked(updateColor);
    round.current = _round + 1;
    letterIndex.current = 0;
  };

  const erase = () => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex !== 0) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex - 1] = "";
        return newGuesses;
      });

      letterIndex.current = _letterIndex - 1;
    }
  };

  const publish = (pressedKey) => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex < wordLength) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex] = pressedKey.toLowerCase();
        return newGuesses;
      });

      letterIndex.current = _letterIndex + 1;
    }
  };

  const enterGuess = async (pressedKey) => {
    if (pressedKey === "enter" && !guesses[round.current].includes("")) {
      const validWord = await fetchWord(guesses[round.current].join(""));

      if (Array.isArray(validWord)) {
        submit();
      }
    } else if (pressedKey === "backspace") {
      erase();
    } else if (pressedKey !== "enter") {
      publish(pressedKey);
    }
  };


  const handleClick = (key) => {
    const pressedKey = key.toLowerCase();

    enterGuess(pressedKey);
  };

  

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toLowerCase();
    // console.log(e.key)
    if (allKeys.includes(pressedKey)) {
      enterGuess(pressedKey);
    }
  };

  useEffect(() => {
    
    Modal.setAppElement("#share");

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <WordGame>
       <Title>🥕 My TORDLE 🐇</Title>
       <GameSection>
        <Board>
          {Object.values(guesses).map((word, wordIndex) => (
              <KeyRow key={wordIndex}>
                {word.map((letter, i, ) => (
                  <Key key={i} hint={checked[wordIndex][i]}>
                    {letter}
                  </Key>
                ))}
              </KeyRow>
            ))}
        </Board>
      </GameSection>
      <Keyboard>
      {keyboardRows.map((keys, i) => (
            <KeyboardRow key={i}>
              {i === 1 && <Flex item={0.5} />}
              {keys.map((key, index) => (
                <KeyboardButton
                  key={key}
                  onClick={() => handleClick(key)}
                >
                  {key === "backspace" ? `Back` : key}
                </KeyboardButton>
              ))}
              {i === 1 && <Flex item={0.5} />}
            </KeyboardRow>
          ))}
      </Keyboard>
      <div id="share">
        <Modal
          isOpen={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Share"
        >
          <ShareModal>
            <Heading>정답입니다 !</Heading>
            <div>
              
            </div>
          </ShareModal>
        </Modal>
      </div>
    </WordGame>
  );
}

export default Worldle;
