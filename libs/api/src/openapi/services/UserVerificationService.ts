/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DriverVerificationRequest } from '../models/DriverVerificationRequest';
import type { UpdateUserVerificationRequest } from '../models/UpdateUserVerificationRequest';
import type { UserVerificationTransformer } from '../models/UserVerificationTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserVerificationService {
    /**
     * Display the authenticated user verification.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveUserVerification(): CancelablePromise<{
        data?: UserVerificationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/verification/user',
        });
    }
    /**
     * Store a new user verification for the authenticated user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeUserVerification({
        requestBody,
    }: {
        requestBody: UpdateUserVerificationRequest,
    }): CancelablePromise<{
        data?: UserVerificationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/verification/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Store a new user verification for the authenticated user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeDriverVerification({
        requestBody,
    }: {
        requestBody: DriverVerificationRequest,
    }): CancelablePromise<{
        data?: UserVerificationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/verification/driver',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
}
