import React from 'react'
import "./CardList.css"
function MemoryCard({card,rotated,handleSelected,disabled}) {
  
  const handleClick=() => {
    if(!disabled){
      handleSelected(card)
    }
  }
  return (
    <div className="card">
      <div className={rotated ? 'rotated' : ''}>
            <img src={card.path} className="cardFront" />
            <img onClick={handleClick} src="/img/cover.jpeg" className="cardBack" />
      </div>
            </div>
  )
}

export default MemoryCard