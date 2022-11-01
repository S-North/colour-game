import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [red, setRed] = useState(0)
  const [blue, setBlue] = useState(0)
  
  const [winner, setWinner] = useState('"R" & "B" TO BATTLE')

  const redKeyAction = () => {
    if (blue < 255) {
      console.log(blue)
      setRed(current => {return current + 8})
      setBlue(current => {return current - 8})

    }
    if (red >= 255) {
      document.removeEventListener('keyup', blueKeyListener);
      document.removeEventListener('click', blueClickListener);
    }
  }

  const redClickAction = (e) => {
    if (e.pageX < (document.body.offsetWidth / 2)) {
      redKeyAction()
    }
  }

  const blueKeyAction = () => {
    setRed(current => {return current - 8})
    setBlue(current => {return current + 8})
  }

  const blueClickAction = (e) => {
    if (e.pageX > (document.body.offsetWidth / 2)) {
      blueKeyAction()
    }
  }

  useEffect(() => {
    const redKeyListener = document.addEventListener("keyup", function (e) {
      if (e.key === "r" && blue < 255) {
        redKeyAction()
      }
    });
    
    const board = document.querySelector('#board')
    const redClickListener = board.addEventListener("click", function (e) {
      redClickAction(e)
    });

    return () => {
      document.removeEventListener('keyup', redKeyListener);
      document.removeEventListener('click', redClickListener);
    }
  }, [])

  useEffect(() => {
    const blueKeyListener = document.addEventListener("keyup", function (e) {
      if (e.key === "b" && red < 255) {
        blueKeyAction()
      }
    });

    const board = document.querySelector('#board')
    const blueClickListener = board.addEventListener("click", function (e) {
      blueClickAction(e)
    });

    return () => {
      document.removeEventListener('keyup', blueKeyListener);
      document.removeEventListener('click', blueClickListener);
    }
  }, [])

  useEffect(() => {
    if (blue >= 255 || winner === 'BLUE WIN') setWinner('BLUE WIN')
    if (red >= 255 || winner === 'RED WIN') setWinner('RED WIN')
  
    return () => {}
  }, [blue, red])
  
  

  return (
    <main>
      <div id='board' className={styles.colourSquare} style={{"backgroundColor": `rgb(${red}, 0, ${blue})`}}>
        <h1 className={styles.winner}>{winner}</h1>
        {winner !== 'HIT KEY TO START BATTLE' && 
        <button className={styles.resetButton} onClick={(e) => {e.preventDefault(); setWinner('"R" & "B" TO BATTLE'); setBlue(0); setRed(0)}}>RESET BATTLE</button>}
      </div>
    </main>
  )
}
