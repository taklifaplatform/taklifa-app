/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthTokenTransformer } from '../models/AuthTokenTransformer';
import type { CheckEmailExistRequest } from '../models/CheckEmailExistRequest';
import type { LoginRequest } from '../models/LoginRequest';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { ResetPasswordRequest } from '../models/ResetPasswordRequest';
import type { SendEmailVerificationPinCodeRequest } from '../models/SendEmailVerificationPinCodeRequest';
import type { SendPhoneNumberVerificationPinCodeRequest } from '../models/SendPhoneNumberVerificationPinCodeRequest';
import type { SendResetPasswordPinCodeRequest } from '../models/SendResetPasswordPinCodeRequest';
import type { VerifyEmailRequest } from '../models/VerifyEmailRequest';
import type { VerifyPhoneNumberRequest } from '../models/VerifyPhoneNumberRequest';
import type { VerifyResetPasswordPinCodeRequest } from '../models/VerifyResetPasswordPinCodeRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Handle an incoming registration request.
     * @returns any Successful response
     * @throws ApiError
     */
    public static register({
        requestBody,
    }: {
        requestBody: RegisterRequest,
    }): CancelablePromise<{
        data?: AuthTokenTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Handle an incoming authentication request.
     * @returns any Successful response
     * @throws ApiError
     */
    public static login({
        requestBody,
    }: {
        requestBody: LoginRequest,
    }): CancelablePromise<{
        data?: AuthTokenTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Destroy an authenticated session.
     * @throws ApiError
     */
    public static logout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * Verify the given user's email address with pin code.
     * @returns void
     * @throws ApiError
     */
    public static verifyEmail({
        requestBody,
    }: {
        requestBody: VerifyEmailRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/verify/email/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Send a verification email to the user with the given email address.
     * @returns void
     * @throws ApiError
     */
    public static sendEmailVerification({
        requestBody,
    }: {
        requestBody: SendEmailVerificationPinCodeRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/verify/email/send-verification',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Verify the given user's phone number with pin code.
     * @returns any Successful response
     * @throws ApiError
     */
    public static verifyPhoneNumber({
        requestBody,
    }: {
        requestBody: VerifyPhoneNumberRequest,
    }): CancelablePromise<{
        data?: AuthTokenTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/verify/phone-number/verify',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Send a verification phone number to the user with the given phone number.
     * @returns void
     * @throws ApiError
     */
    public static sendPhoneNumberVerification({
        requestBody,
    }: {
        requestBody: SendPhoneNumberVerificationPinCodeRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/verify/phone-number/send-verification',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Send a reset password mail to the given phone_number address.
     * @returns void
     * @throws ApiError
     */
    public static sendResetPasswordPinCode({
        requestBody,
    }: {
        requestBody: SendResetPasswordPinCodeRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset-password/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Verify the given user's phone_number address with pin code.
     * @returns void
     * @throws ApiError
     */
    public static verifyResetPasswordPinCode({
        requestBody,
    }: {
        requestBody: VerifyResetPasswordPinCodeRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset-password/check',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Reset the password for the given token.
     * @returns void
     * @throws ApiError
     */
    public static resetPassword({
        requestBody,
    }: {
        requestBody: ResetPasswordRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset-password/change',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Handle an incoming authentication request.
     * @returns void
     * @throws ApiError
     */
    public static checkEmailExists({
        requestBody,
    }: {
        requestBody: CheckEmailExistRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/check-email-exists',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
}
