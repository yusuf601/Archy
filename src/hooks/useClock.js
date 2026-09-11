import { useEffect, useMemo, useState } from 'react'

export function useClock() {
    const [now, setNow] = useState(() => new Date())
    const formatter = useMemo(
        () => new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }),
        [],
    )

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 60000)
        return () => window.clearInterval(timer)
    }, [])

    return formatter.format(now)
}
