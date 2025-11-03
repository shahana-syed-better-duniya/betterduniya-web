import { act, renderHook } from '@testing-library/react-native';
import { userAuthApi } from '../../../api/user/userAuth';
import useLogin from '../../../hooks/auth/use-login';

// Mock the useRequest hook
jest.mock('../../../hooks/api/use-request', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the userAuthApi
jest.mock('../../../api/user/userAuth', () => ({
  userAuthApi: {
    loginAccount: {
      method: jest.fn(),
      path: jest.fn(() => '/user/login'),
      okMessage: 'Login is successful',
    },
  },
}));

const mockUseRequest = require('../../../hooks/api/use-request').default;

describe('useLogin', () => {
  const mockOnRequest = jest.fn();
  const mockIsLoading = false;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRequest.mockReturnValue({
      onRequest: mockOnRequest,
      isLoading: mockIsLoading,
    });
  });

  it('should return login function and loading state', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current).toHaveProperty('onLogin');
    expect(result.current).toHaveProperty('isLoading');
    expect(typeof result.current.onLogin).toBe('function');
    expect(result.current.isLoading).toBe(false);
  });

  it('should call onRequest with correct parameters on login', async () => {
    const mockResponse = {
      result: {
        userId: '123',
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        userName: 'testuser',
        firstName: 'Test',
        lastName: 'User',
      },
    };

    mockOnRequest.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useLogin());

    const email = 'test@example.com';
    const password = 'testpassword';

    let loginResult;
    await act(async () => {
      loginResult = await result.current.onLogin(email, password);
    });

    expect(mockOnRequest).toHaveBeenCalledWith(
      userAuthApi.loginAccount,
      [],
      { email, password },
      false
    );

    expect(loginResult).toEqual(mockResponse.result);
  });

  it('should handle login with valid credentials', async () => {
    const mockUserInfo = {
      userId: '123',
      accessToken: 'valid-token',
      refreshToken: 'valid-refresh-token',
      userName: 'testuser',
      firstName: 'Test',
      lastName: 'User',
    };

    mockOnRequest.mockResolvedValueOnce({ result: mockUserInfo });

    const { result } = renderHook(() => useLogin());

    let loginResult;
    await act(async () => {
      loginResult = await result.current.onLogin('test@example.com', 'password123');
    });

    expect(loginResult).toEqual(mockUserInfo);
    expect(mockOnRequest).toHaveBeenCalledTimes(1);
  });

  it('should handle login with invalid credentials', async () => {
    const mockEmptyResponse = { result: null };

    mockOnRequest.mockResolvedValueOnce(mockEmptyResponse);

    const { result } = renderHook(() => useLogin());

    let loginResult;
    await act(async () => {
      loginResult = await result.current.onLogin('invalid@example.com', 'wrongpassword');
    });

    expect(loginResult).toBeNull();
  });

  it('should handle network errors during login', async () => {
    const networkError = new Error('Network error');
    mockOnRequest.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useLogin());

    await expect(
      act(async () => {
        await result.current.onLogin('test@example.com', 'password123');
      })
    ).rejects.toThrow('Network error');
  });
});