import { useState } from 'react'
import { createPortal } from 'react-dom'

// A button that teleports to a random spot anywhere on screen when the cursor
// (or keyboard focus) reaches it. Once it moves it renders through a portal to
// <body> so no clipping/overflow ancestor can hide it.
export default function RunawayButton({ children, onMoved, ...props }) {
  const [pos, setPos] = useState(null)

  const dodge = (e) => {
    const el = e.currentTarget
    const x = 12 + Math.random() * Math.max(0, window.innerWidth - el.offsetWidth - 24)
    const y = 12 + Math.random() * Math.max(0, window.innerHeight - el.offsetHeight - 24)
    setPos({ x, y })
    onMoved?.()
  }

  const moved = pos !== null

  const btn = (
    <button
      {...props}
      onMouseEnter={dodge}
      onFocus={dodge}
      style={
        moved
          ? { position: 'fixed', left: pos.x, top: pos.y, margin: 0, zIndex: 9999 }
          : undefined
      }
    >
      {children}
    </button>
  )

  return moved ? createPortal(btn, document.body) : btn
}
