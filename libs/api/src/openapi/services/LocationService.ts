/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiveLocationTransformer } from '../models/LiveLocationTransformer';
import type { LocationTransformer } from '../models/LocationTransformer';
import type { UpdateLiveLocationRequest } from '../models/UpdateLiveLocationRequest';
import type { UpdateLocationRequest } from '../models/UpdateLocationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationService {
    /**
     * Retrieve Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        location,
    }: {
        location: string,
    }): CancelablePromise<{
        data?: LocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/locations/{location}',
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
    public static update({
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
            url: '/api/locations/{location}',
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
     * User Store Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: UpdateLocationRequest,
    }): CancelablePromise<{
        data?: LocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/locations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * User Store Location.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateLiveLocation({
        requestBody,
    }: {
        requestBody: UpdateLiveLocationRequest,
    }): CancelablePromise<{
        data?: LiveLocationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/locations/live-location/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
}
