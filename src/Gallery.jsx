import { useState } from 'react'
import { useSpring, animated, to } from '@react-spring/web'
import card1 from './assets/card1.png'
import card2 from './assets/card2.png'
import card3 from './assets/card3.png'
import card4 from './assets/card4.png'
import letterbox from './assets/letter box.png'
import letter from './assets/letter.png'

// Each card: photo + natural aspect ratio + how far it hangs + sway timing
const CARDS = [
  { src: card1, w: 238, h: 315, drop: 30, dur: 4.2, delay: 0.0, amp: 2.6 },
  { src: card2, w: 238, h: 312, drop: 150, dur: 3.6, delay: 0.6, amp: 3.2 },
  { src: card3, w: 238, h: 329, drop: 0, dur: 4.8, delay: 0.3, amp: 2.2 },
  { src: card4, w: 238, h: 329, drop: 90, dur: 3.9, delay: 0.9, amp: 2.9 },
]

function HangingCard({ src, w, h, drop, dur, delay, amp }) {
  const [hovered, setHovered] = useState(false)

  // FLIP — spring with a touch of overshoot so it feels like a real card turning
  const flip = useSpring({
    rotateY: hovered ? 180 : 0,
    config: { mass: 1.2, tension: 170, friction: 14 },
  })

  // BOUNCE — low friction => damped oscillation (real pendulum-like bob on hover)
  const bounce = useSpring({
    y: hovered ? -22 : 0,
    scale: hovered ? 1.08 : 1,
    config: { mass: 1, tension: 320, friction: 7 },
  })

  const cardW = w * 0.78 // scale photos down a bit for layout

  return (
    <div className="hanger">
      {/* swaying pendulum: the string + card rotate together about the ceiling point */}
      <div
        className="pendulum"
        style={{
          '--dur': `${dur}s`,
          '--delay': `${-delay}s`,
          '--amp': `${amp}deg`,
        }}
      >
        <div className="string" style={{ height: `${40 + drop}px` }} />
        <animated.div
          className="card3d"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: `${cardW}px`,
            height: `${cardW * (h / w)}px`,
            transform: to(
              [bounce.y, bounce.scale, flip.rotateY],
              (y, s, r) => `translateY(${y}px) scale(${s}) rotateY(${r}deg)`,
            ),
          }}
        >
          <div className="face back">
            <div className="back-inner">
              <img className="back-icon" src={letterbox} alt="" />
              <span className="back-text">hover me</span>
            </div>
          </div>
          <div className="face front">
            <img src={src} alt="A memory with papa" draggable="false" />
          </div>
        </animated.div>
      </div>
    </div>
  )
}

const DARES = [
  "Pay Gargi's savana bill",
  "Give Gargi 2000rs right now!!!",
  "Say I love you Gargi",
  "Take Nishu and Gargi out on lunch",
  "Pay Gargi's savana bill PLEASEEEE🙏🙏🙏🙏",
]

export default function Gallery() {
  const [openIdx, setOpenIdx] = useState(null)

  const openDare = (i) => setOpenIdx(i)
  const pickRandom = () => setOpenIdx(Math.floor(Math.random() * DARES.length))
  const closeDare = () => setOpenIdx(null)

  return (
    <div className="gallery">
      <div className="hangers">
        {CARDS.map((c, i) => (
          <HangingCard key={i} {...c} />
        ))}
      </div>
      {/* <p className="gallery-hint">hover a card to flip it ✦</p> */}
      <img className="letter" src={letter} alt="A letter for papa" draggable="false" />

      <div className="bowl-scene">
        <h1 className="bowl-caption">Cute Father's day activity 💌</h1>
        <p>Pick a dare!!!</p>
        <div
          className="bowl-wrap"
          onClick={pickRandom}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && pickRandom()}
          title="Pick a dare"
        >
          <div className="bowl-rim" />
          <div className="notes">
            {DARES.map((_, i) => (
              <span
                key={i}
                className={`note n${i + 1}`}
                title={`Dare #${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  openDare(i)
                }}
              />
            ))}
          </div>
          <div className="bowl-body" />
        </div>
      </div>

      {openIdx !== null && (
        <div className="note-pop" onClick={closeDare}>
          <div className="crumpled" onClick={(e) => e.stopPropagation()}>
            <span className="note-num">Dare #{openIdx + 1}</span>
            <p className="note-text">{DARES[openIdx]}</p>
            <div className="note-actions">
              <button className="btn btn-popup" onClick={closeDare}>
                Okay 💪
              </button>
              <button className="btn btn-ghost" onClick={closeDare}>
                Pass 🙈
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
