/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticatedUserTransformer } from '../models/AuthenticatedUserTransformer';
import type { ChangeActiveRoleRequest } from '../models/ChangeActiveRoleRequest';
import type { UpdateEmailRequest } from '../models/UpdateEmailRequest';
import type { UpdatePasswordRequest } from '../models/UpdatePasswordRequest';
import type { UpdatePhoneNumberRequest } from '../models/UpdatePhoneNumberRequest';
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
     * @returns any Successful response
     * @throws ApiError
     */
    public static updatePassword({
        requestBody,
    }: {
        requestBody: UpdatePasswordRequest,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update User email .
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateEmail({
        requestBody,
    }: {
        requestBody: UpdateEmailRequest,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update User email .
     * @returns any Successful response
     * @throws ApiError
     */
    public static updatePhoneNumber({
        requestBody,
    }: {
        requestBody: UpdatePhoneNumberRequest,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/update-phone-number',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Activate a role for the authenticated user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static changeActiveRole({
        requestBody,
    }: {
        requestBody: ChangeActiveRoleRequest,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/change-active-role',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
