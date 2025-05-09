/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticatedUserTransformer } from '../models/AuthenticatedUserTransformer';
import type { ChangeActiveRoleRequest } from '../models/ChangeActiveRoleRequest';
import type { UpdateEmailRequest } from '../models/UpdateEmailRequest';
import type { UpdatePasswordRequest } from '../models/UpdatePasswordRequest';
import type { UpdatePhoneNumberRequest } from '../models/UpdatePhoneNumberRequest';
import type { UpdateUserLocationRequest } from '../models/UpdateUserLocationRequest';
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
            url: '/api/auth/user',
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
            method: 'PUT',
            url: '/api/auth/user',
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
            url: '/api/auth/user/update-password',
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
            url: '/api/auth/user/update-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update User phone number .
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
            url: '/api/auth/user/update-phone-number',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update the authenticated user location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateLocation({
        requestBody,
    }: {
        requestBody: UpdateUserLocationRequest,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/user/update-location',
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
            url: '/api/auth/user/change-active-role',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete User Account.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteAccount(): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/auth/user/delete-account',
        });
    }
    /**
     * Enable Customer Role.
     * @returns any Successful response
     * @throws ApiError
     */
    public static enableCustomerRole(): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/user/enable-customer-role',
        });
    }
}
