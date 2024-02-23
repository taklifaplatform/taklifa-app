/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTransformer } from '../models/LocationTransformer';
import type { UpdateLocationRequest } from '../models/UpdateLocationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserLocationsService {
    /**
     * User Fetch List Locations.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllLocations({
        page,
        perPage,
        search,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
        search?: string,
    }): CancelablePromise<{
        data?: Array<LocationTransformer>;
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
            url: '/api/user/locations',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * User Store Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createLocation({
        requestBody,
    }: {
        requestBody: UpdateLocationRequest,
    }): CancelablePromise<{
        data?: LocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/locations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * User Retrieve Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveLocation({
        location,
    }: {
        location: string,
    }): CancelablePromise<{
        data?: LocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/locations/{location}',
            path: {
                'location': location,
            },
        });
    }
    /**
     * User Update Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateLocation({
        location,
        requestBody,
    }: {
        location: string,
        requestBody: UpdateLocationRequest,
    }): CancelablePromise<{
        data?: LocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/locations/{location}',
            path: {
                'location': location,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * User Delete Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteLocation({
        location,
    }: {
        location: string,
    }): CancelablePromise<{
        data?: LocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user/locations/{location}',
            path: {
                'location': location,
            },
        });
    }
}
