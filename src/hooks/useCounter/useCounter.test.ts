import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '.';

describe('useCounter test', () => {
    it('should return the initial value', () => {
        const { result } = renderHook(() => useCounter(10));
      
        expect(result.current.count).toBe(10);
    })

    it('should increment the count', () => {
        const {result} = renderHook(() => useCounter(10));

        act(() => {
            result.current.increment();
        })

        expect(result.current.count).toBe(11);
    })

    it('should decrement the count', () => {
        const {result} = renderHook(() => useCounter(10));

        act(() => {
            result.current.decrement();
        })

        expect(result.current.count).toBe(9);
    })

    it('should reset the count', () => {
        const {result} = renderHook(() => useCounter(10));

        act(() => {
            result.current.increment();
        })

        act(() => {
            result.current.reset();
        })

        expect(result.current.count).toBe(10);
    })
})