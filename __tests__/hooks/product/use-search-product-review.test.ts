import { act, renderHook } from '@testing-library/react-native';
import React from 'react';
import useSearchProductReview from '../../../hooks/product/use-search-product-review';
import { ProductReview, ProductReviewState } from '../../../interfaces/products/productReview';
import { ProductReviewSummary } from '../../../interfaces/products/productReviewSummary';
import { ProductReviewContextProvider } from '../../../utils/products/product-review-context';

// Mock the useRequest hook
jest.mock('../../../hooks/api/use-request', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the productApi
jest.mock('../../../api/product/product', () => ({
  productApi: {
    searchReview: {
      method: jest.fn(),
      path: jest.fn((name: string) => `/product/review/search?name=${name}`),
      okMessage: 'Product review is searched',
    },
  },
}));

const mockUseRequest = require('../../../hooks/api/use-request').default;

describe('useSearchProductReview', () => {
  const mockOnRequest = jest.fn();
  const mockIsLoading = false;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRequest.mockReturnValue({
      onRequest: mockOnRequest,
      isLoading: mockIsLoading,
    });
  });

  const mockProductReview: ProductReview = {
    id: '1',
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    title: 'Great Product',
    description: 'This is an amazing product that I would highly recommend!',
    rating: 5,
    reviewState: ProductReviewState.Recommended,
    userId: 'user123',
    productImages: [],
  };

  const mockSearchResults: ProductReviewSummary = {
    reviews: [mockProductReview],
    userById: {
      user123: {
        id: 'user123',
        createdAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
        email: 'user@example.com',
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        isVerified: true,
        bio: 'Test user bio',
        userAuthPassword: null,
        userProfileImage: null,
      },
    },
    profileImageUriByUserId: {
      user123: 'https://example.com/profile.jpg',
    },
    reviewImageUriById: {},
  };

  // Test wrapper with context
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(ProductReviewContextProvider, { children });

  it('should return search function, summary, and loading state', () => {
    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });

    expect(result.current).toHaveProperty('onSearch');
    expect(result.current).toHaveProperty('summary');
    expect(result.current).toHaveProperty('isLoading');
    expect(typeof result.current.onSearch).toBe('function');
    expect(result.current.isLoading).toBe(false);
  });

  it('should perform search with correct parameters', async () => {
    mockOnRequest.mockResolvedValueOnce({ result: mockSearchResults });

    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });

    // Set search value first
    act(() => {
      result.current.searchValue.onChangeValue('Great Product');
    });

    await act(async () => {
      await result.current.onSearch();
    });

    expect(mockOnRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        path: expect.any(Function),
      }),
      ['Great Product'],
      null,
      false
    );
  });

  it('should return search results when search is successful', async () => {
    mockOnRequest.mockResolvedValueOnce({ result: mockSearchResults });

    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });

    act(() => {
      result.current.searchValue.onChangeValue('Great Product');
    });

    await act(async () => {
      await result.current.onSearch();
    });

    expect(result.current.summary).toEqual(mockSearchResults);
  });

  it('should handle empty search results', async () => {
    const emptyResults: ProductReviewSummary = {
      reviews: [],
      userById: {},
      profileImageUriByUserId: {},
      reviewImageUriById: {},
    };

    mockOnRequest.mockResolvedValueOnce({ result: emptyResults });

    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });

    act(() => {
      result.current.searchValue.onChangeValue('Nonexistent Product');
    });

    await act(async () => {
      await result.current.onSearch();
    });

    expect(result.current.summary).toEqual(emptyResults);
  });

  it('should handle search errors gracefully', async () => {
    const searchError = new Error('Search failed');
    mockOnRequest.mockRejectedValueOnce(searchError);

    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });

    act(() => {
      result.current.searchValue.onChangeValue('Product');
    });

    await expect(
      act(async () => {
        await result.current.onSearch();
      })
    ).rejects.toThrow('Search failed');
  });

  it('should handle special characters in search query', async () => {
    mockOnRequest.mockResolvedValueOnce({ result: mockSearchResults });

    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });
    const specialQuery = 'Product & Co. (2023)!';

    act(() => {
      result.current.searchValue.onChangeValue(specialQuery);
    });

    await act(async () => {
      await result.current.onSearch();
    });

    expect(mockOnRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        path: expect.any(Function),
      }),
      [specialQuery],
      null,
      false
    );
  });

  it('should handle multiple search calls', async () => {
    mockOnRequest
      .mockResolvedValueOnce({ result: mockSearchResults })
      .mockResolvedValueOnce({ result: { ...mockSearchResults, reviews: [] } });

    const { result } = renderHook(() => useSearchProductReview(), { wrapper: Wrapper });

    act(() => {
      result.current.searchValue.onChangeValue('First Search');
    });

    await act(async () => {
      await result.current.onSearch();
    });

    act(() => {
      result.current.searchValue.onChangeValue('Second Search');
    });

    await act(async () => {
      await result.current.onSearch();
    });

    expect(mockOnRequest).toHaveBeenCalledTimes(2);
    expect(mockOnRequest).toHaveBeenNthCalledWith(
      1,
      expect.any(Object),
      ['First Search'],
      null,
      false
    );
    expect(mockOnRequest).toHaveBeenNthCalledWith(
      2,
      expect.any(Object),
      ['Second Search'],
      null,
      false
    );
  });
});