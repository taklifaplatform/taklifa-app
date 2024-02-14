/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticatedUserTransformer } from '../models/AuthenticatedUserTransformer';
import type { UpdatePasswordRequest } from '../models/UpdatePasswordRequest';
import type { UpdateUserRequest } from '../models/UpdateUserRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Retrieve the authenticated user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveUser(): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user',
        });
    }
    /**
     * Update the authenticated user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateUser({
        requestBody,
    }: {
        requestBody: UpdateUserRequest,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update User password .
     * @throws ApiError
     */
    public static updatePassword({
        requestBody,
    }: {
        requestBody: UpdatePasswordRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Activate a role for the authenticated user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static activateRole({
        role,
    }: {
        role: string,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/roles/{role}/activate',
            path: {
                'role': role,
            },
        });
    }
}
