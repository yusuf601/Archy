import { useEffect, useRef } from 'react'

export default function MenuPopover({ id, labelledBy, onClose, children }) {
    const ref = useRef(null)

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (!ref.current?.contains(event.target)) onClose()
        }
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
                document.getElementById(labelledBy)?.focus()
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [labelledBy, onClose])

    return (
        <div ref={ref} id={id} role="menu" aria-labelledby={labelledBy} className="desktop-menu-popover">
            {children}
        </div>
    )
}
