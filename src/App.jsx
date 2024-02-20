import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import MemoryCard from './Components/MemoryCard';

function App() {
  const [cards, setCards] = useState([])
  const [selectedOne, setselectedOne] = useState(null)
  const [selectedTwo, setselectedTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [score, setScore] = useState(0)
  const cardList = [
    {"path":"/img/1.jpeg",matched:false},
    {"path":"/img/2.jpeg",matched:false},
    {"path":"/img/3.jpeg",matched:false},
    {"path":"/img/4.jpeg",matched:false},
    {"path":"/img/5.jpeg",matched:false},
    {"path":"/img/6.jpeg",matched:false},
    {"path":"/img/7.jpeg",matched:false},
    {"path":"/img/8.jpeg",matched:false},
  ]
  const handleSelected=(card) => {
      selectedOne ? setselectedTwo(card):setselectedOne(card)
  }
  const prepareCard=()=>{
   const sortCards=[...cardList,...cardList]
   .sort(() => 0.5-Math.random())
   .map((card) => (
    {...card,id:Math.random()}
   ))
   setCards(sortCards)
   setselectedOne(null)
   setselectedTwo(null)
   setScore(0)
  }
useEffect(() => {
  prepareCard()
},[])
  useEffect(()=>{
      if(selectedOne && selectedTwo){
        setDisabled(true)
        if(selectedOne.path === selectedTwo.path){
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.path === selectedOne.path){
                return {...card, matched:true}
              }else{
                return card
              }
            })
          })
       
            resetState()

        }else{
            setTimeout(() => {
                resetState()
            },1000)
        }
      }
  },[selectedOne,selectedTwo])
  const resetState = () => {
    setselectedOne(null)
          setselectedTwo(null)
          setDisabled(false)
          setScore(prevScore => prevScore+1)
  }
  return (
    <div className="container">
      <h1>Memory App</h1>
          <button onClick={prepareCard}>Oyuna Başla</button>
          <p>score : {score}</p>
          <div className="card-grid">
            {cards.map(card => (
              <MemoryCard 
              disabled={disabled} 
              handleSelected={handleSelected} 
              card={card} 
              key={card.id}
              rotated = { card.matched || card === selectedOne || card===selectedTwo}
              />
            ))}
          </div>
    </div>
  );
}

export default App;
