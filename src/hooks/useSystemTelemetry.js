import { useEffect, useState } from 'react'

export const CPU_SEQUENCE = [17, 25, 35, 28, 45, 31]
export const RAM_SEQUENCE = [4.89, 5.04, 5.18, 5.11, 4.96]

export function useSystemTelemetry(intervalMs = 3000) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        let timer
        const start = () => {
            window.clearInterval(timer)
            if (document.visibilityState === 'visible') {
                timer = window.setInterval(() => setIndex((value) => value + 1), intervalMs)
            }
        }

        start()
        document.addEventListener('visibilitychange', start)
        return () => {
            window.clearInterval(timer)
            document.removeEventListener('visibilitychange', start)
        }
    }, [intervalMs])

    return {
        cpu: CPU_SEQUENCE[index % CPU_SEQUENCE.length],
        ramGiB: RAM_SEQUENCE[index % RAM_SEQUENCE.length],
        storageGiB: 318.67,
        battery: 96,
        volume: 60,
    }
}
