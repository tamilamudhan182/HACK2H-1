import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService } from './api';

// Mock the global fetch
global.fetch = vi.fn();

describe('ElectionCompassService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getInstance should return a singleton instance', () => {
    const instance1 = apiService;
    // @ts-ignore - access private constructor for test
    const instance2 = apiService;
    expect(instance1).toBe(instance2);
  });

  it('getTimeline should fetch data from the correct endpoint', async () => {
    const mockMilestones = { milestones: [{ id: '1', title: 'Test' }] };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockMilestones,
    });

    const result = await apiService.getTimeline();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/timeline'), expect.any(Object));
    expect(result).toEqual(mockMilestones);
  });

  it('should throw error when response is not ok', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server Error' }),
    });

    await expect(apiService.getProgress()).rejects.toThrow('Server Error');
  });
});
