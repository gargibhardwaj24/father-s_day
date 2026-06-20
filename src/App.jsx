import { useState, useCallback, useRef } from 'react'
import musicUrl from './music.mp3'
import Gallery from './Gallery.jsx'

const MUSIC_START = 168 // start at 2:48

const messages = [
  'Thank you for everything you do. ❤️',
  "You're my hero and my role model.",
  'Thanks for always believing in me.',
  "The world's greatest dad — that's you!",
  'Happy Father\'s Day, with all my love.',
]

const heartEmojis = ['❤️', '💛', '🧡', '👔', '⭐']

export default function App() {
  const [showPopup, setShowPopup] = useState(true)
  const [showMusicPopup, setShowMusicPopup] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [hearts, setHearts] = useState([])
  const audioRef = useRef(null)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(musicUrl)
      audio.loop = true
      audio.volume = 0.6
      // keep looping from the 2:50 mark instead of the very start
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime < MUSIC_START - 0.5) audio.currentTime = MUSIC_START
      })
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const startMusic = useCallback(() => {
    const audio = getAudio()
    audio.currentTime = MUSIC_START
    audio.play().catch(() => {})
    setMusicOn(true)
  }, [getAudio])

  const stopMusic = useCallback(() => {
    audioRef.current?.pause()
    setMusicOn(false)
  }, [])

  const burstHearts = useCallback(() => {
    const batch = Array.from({ length: 18 }, (_, n) => ({
      id: `${Date.now()}-${n}`,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      size: 1 + Math.random() * 1.5,
    }))
    setHearts((prev) => [...prev, ...batch])
    setTimeout(() => {
      const ids = new Set(batch.map((h) => h.id))
      setHearts((prev) => prev.filter((h) => !ids.has(h.id)))
    }, 5000)
  }, [])

  const handleSurprise = () => {
    setMessageIndex((i) => (i + 1) % messages.length)
    burstHearts()
  }

  // First popup -> dismiss, then ask about music
  const handleThankYou = () => {
    setShowPopup(false)
    setShowMusicPopup(true)
    burstHearts()
  }

  const handleMusicYes = () => {
    startMusic()
    setShowMusicPopup(false)
    setShowGallery(true)
    burstHearts()
  }

  const handleMusicNo = () => {
    setShowMusicPopup(false)
    setShowGallery(true)
  }

  const toggleMusic = () => {
    if (musicOn) stopMusic()
    else startMusic()
  }

  return (
    <>
      {showPopup && (
        <div className="overlay">
          <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
            <div className="popup-spark">✦</div>
            <h2 id="popup-title">
              Happy Father's Day Papa <span className="hb">❤️</span>
            </h2>
            <p className="subtext">A little something made just for you.</p>
            <button className="btn btn-popup" onClick={handleThankYou}>
              Thank you
            </button>
          </div>
        </div>
      )}

      {showMusicPopup && (
        <div className="overlay">
          <div className="popup" role="dialog" aria-modal="true" aria-labelledby="music-title">
            <div className="popup-spark">🎵</div>
            <h2 id="music-title">Enter with some music?</h2>
            <p className="subtext">It sets the whole mood, promise.</p>
            <div className="popup-actions">
              <button className="btn btn-popup" onClick={handleMusicYes}>
                Yes!!! Of course
              </button>
              <button className="btn btn-ghost" onClick={handleMusicNo}>
                No, I am a bore
              </button>
            </div>
          </div>
        </div>
      )}

      {showGallery ? (
        <Gallery />
      ) : (
        <main className="card">
          <div className="tie">👔</div>
          <h1>Happy Father's Day</h1>
          <p className="subtitle">To the best dad in the world</p>
          <p className="message">{messages[messageIndex]}</p>
          <button className="btn" onClick={handleSurprise}>
            Show me some love ❤️
          </button>
        </main>
      )}

      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={musicOn ? 'Turn music off' : 'Turn music on'}
        title={musicOn ? 'Music on' : 'Music off'}
      >
        {musicOn ? '🔊' : '🔈'}
      </button>

      <div className="hearts" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}vw`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}rem`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>
    </>
  )
}
