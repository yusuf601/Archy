import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useSystemTelemetry } from './useSystemTelemetry'

describe('useSystemTelemetry', () => {
    afterEach(() => {
        vi.useRealTimers()
        vi.restoreAllMocks()
    })

    it('advances deterministic values every three seconds', () => {
        vi.useFakeTimers()
        const { result } = renderHook(() => useSystemTelemetry())
        expect(result.current.cpu).toBe(17)
        expect(result.current.ramGiB).toBe(4.89)
        act(() => vi.advanceTimersByTime(3000))
        expect(result.current.cpu).toBe(25)
        expect(result.current.ramGiB).toBe(5.04)
    })

    it('pauses while the document is hidden and resumes once visible', () => {
        vi.useFakeTimers()
        let visibility = 'visible'
        vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibility)
        const { result } = renderHook(() => useSystemTelemetry())

        visibility = 'hidden'
        act(() => document.dispatchEvent(new Event('visibilitychange')))
        act(() => vi.advanceTimersByTime(6000))
        expect(result.current.cpu).toBe(17)

        visibility = 'visible'
        act(() => document.dispatchEvent(new Event('visibilitychange')))
        act(() => vi.advanceTimersByTime(3000))
        expect(result.current.cpu).toBe(25)
    })
})
