import { describe, it, expect } from 'vitest';
import { isoToSimpleDate } from '.';

describe('isoToSimpleDate test', () => {
	it('should return the simple date from the iso', () => {
		const iso = '2026-01-19T12:00:00.000Z';
		const simpleDate = isoToSimpleDate(iso);
		expect(simpleDate).toBe('19/01/2026');
	});
});