import { useState, useEffect, useRef } from 'react'
import Quote from './Components/Quote'
import Footer from "./Components/Footer"
import colors from "./assets/colors"

function App() {
  const [quoteBox, setQuoteBox] = useState({
    quoteText: "",
    author: "",
    color: ""
  })

  async function getTotalNumOfQuotes() {
    const responseTotalNum = await fetch(`https://the-one-api.dev/v2/quote?limit=${1}`, {
      headers: {Authorization: "Bearer v69jV_YKIt4-X7aHoyEY"}
    })
    const dataTotalNum = await responseTotalNum.json();
    const totalQuotesNum = await dataTotalNum.total
    return totalQuotesNum
  }

  async function getRandomQuoteData(totalQuotesNum) {
    const randomNumber = 
    Math.floor(Math.random() * totalQuotesNum - 1) + 1
 
    const response = await fetch(`https://the-one-api.dev/v2/quote?limit=${totalQuotesNum}`, {
      headers: {Authorization: "Bearer v69jV_YKIt4-X7aHoyEY"}
    })
    const data = await response.json();
    return data.docs[randomNumber]
  }

  async function getCharacterData(characterId) {
    const response = await fetch(`https://the-one-api.dev/v2/character/${characterId}`, {
      headers: {Authorization: "Bearer v69jV_YKIt4-X7aHoyEY"}
    })
    const data = await response.json();
    return data
  }

  async function getQuoteBox() {
    const totalQuotesNum = await getTotalNumOfQuotes()
    const randomQuote = await getRandomQuoteData(totalQuotesNum)
    const character = await getCharacterData(randomQuote.character)
    const randomColor = getRandomColor()
    setQuoteBox(prevQuoteBox => ({
      ...prevQuoteBox,
      quoteText: randomQuote.dialog,
      author: character.docs[0].name,
      color: randomColor
    }))
  }

  useEffect(() => {
    getQuoteBox();
  }, [])

  function getRandomColor() {
    const hue = [Math.floor(Math.random() * 361)];
    const saturation = [Math.floor(Math.random() * 101)];
    const lightness = [Math.floor(Math.random() * (70-10) + 10)] // creates random number in range
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }


  return (
    <div id="background" style={{backgroundColor: quoteBox.color}}>
    <div id="quote-box">
      <Quote quoteContent={quoteBox}/>
      <Footer getNewQuote={getQuoteBox} color={quoteBox.color}/>
    </div>
    </div>
  )
}

export default App

