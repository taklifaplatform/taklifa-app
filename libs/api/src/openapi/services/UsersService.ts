/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserTransformer } from '../models/UserTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Fetch all users.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllUsers(): CancelablePromise<{
        data?: Array<UserTransformer>;
        links?: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
        meta?: {
            current_page?: number;
            from?: number;
            last_page?: number;
            links?: Array<{
                url?: string;
                label?: string;
                active?: boolean;
            }>;
            path?: string;
            per_page?: number;
            to?: number;
            total?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users',
        });
    }
    /**
     * Retrieve a user.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveUser({
        user,
    }: {
        user: string,
    }): CancelablePromise<{
        data?: UserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{user}',
            path: {
                'user': user,
            },
        });
    }
}
