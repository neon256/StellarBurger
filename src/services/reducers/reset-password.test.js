import { initialResetPassword, resetPassword } from './reset-password';
import {
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
} from '../constants/reset-password';

describe('resetPassword reducer', () => {
  

  it('should return the initial state', () => {
    expect(resetPassword(undefined, {})).toEqual(initialResetPassword);
  });

  // Тесты для POST_FORGOT_PASSWORD
  it('should handle POST_FORGOT_PASSWORD_REQUEST', () => {
    const action = { type: POST_FORGOT_PASSWORD_REQUEST };
    const expectedState = {
      ...initialResetPassword,
      load: true,
      dataRequest: true,
    };
    expect(resetPassword(initialResetPassword, action)).toEqual(expectedState);
  });

  it('should handle POST_FORGOT_PASSWORD_SUCCESS', () => {
    const action = {
      type: POST_FORGOT_PASSWORD_SUCCESS,
      value: { success: true, message: 'Email sent successfully' },
    };
    const expectedState = {
      ...initialResetPassword,
      load: false,
      dataRequest: false,
      dataFailed: false,
      success: true,
      message: 'Email sent successfully',
    };
    expect(resetPassword(initialResetPassword, action)).toEqual(expectedState);
  });

  it('should handle POST_FORGOT_PASSWORD_FAILED', () => {
    const action = { type: POST_FORGOT_PASSWORD_FAILED };
    const expectedState = {
      ...initialResetPassword,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(resetPassword(initialResetPassword, action)).toEqual(expectedState);
  });

  // Тесты для POST_RESET_PASSWORD
  it('should handle POST_RESET_PASSWORD_REQUEST', () => {
    const action = { type: POST_RESET_PASSWORD_REQUEST };
    const expectedState = {
      ...initialResetPassword,
      load: true,
      dataRequest: true,
    };
    expect(resetPassword(initialResetPassword, action)).toEqual(expectedState);
  });

  it('should handle POST_RESET_PASSWORD_SUCCESS', () => {
    const action = {
      type: POST_RESET_PASSWORD_SUCCESS,
      value: { success: true, message: 'Password reset successfully' },
    };
    const expectedState = {
      ...initialResetPassword,
      load: false,
      dataRequest: false,
      dataFailed: false,
      success: true,
      message: 'Password reset successfully',
    };
    expect(resetPassword(initialResetPassword, action)).toEqual(expectedState);
  });

  it('should handle POST_RESET_PASSWORD_FAILED', () => {
    const action = { type: POST_RESET_PASSWORD_FAILED };
    const expectedState = {
      ...initialResetPassword,
      load: false,
      dataRequest: false,
      dataFailed: true,
    };
    expect(resetPassword(initialResetPassword, action)).toEqual(expectedState);
  });
});