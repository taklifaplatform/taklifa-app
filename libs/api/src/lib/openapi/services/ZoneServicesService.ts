/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceZoneTransformer } from '../models/ServiceZoneTransformer';
import type { UpdateServiceZoneRequest } from '../models/UpdateServiceZoneRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ZoneServicesService {
    /**
     * display the list of zone services
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllZoneServices({
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
        data?: Array<ServiceZoneTransformer>;
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
            url: '/api/service-zones',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Create a zone service
     * @returns any Successful response
     * @throws ApiError
     */
    public static createZoneService({
        requestBody,
    }: {
        requestBody: UpdateServiceZoneRequest,
    }): CancelablePromise<{
        data?: ServiceZoneTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/service-zones',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Retrieve a zone service
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveZoneService({
        serviceZone,
    }: {
        serviceZone: string,
    }): CancelablePromise<{
        data?: ServiceZoneTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/service-zones/{serviceZone}',
            path: {
                'serviceZone': serviceZone,
            },
        });
    }
    /**
     * Update a zone service
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateZoneService({
        serviceZone,
        requestBody,
    }: {
        serviceZone: string,
        requestBody: UpdateServiceZoneRequest,
    }): CancelablePromise<{
        data?: ServiceZoneTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/service-zones/{serviceZone}',
            path: {
                'serviceZone': serviceZone,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Delete a zone service
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteZoneService({
        serviceZone,
    }: {
        serviceZone: string,
    }): CancelablePromise<{
        data?: ServiceZoneTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/service-zones/{serviceZone}',
            path: {
                'serviceZone': serviceZone,
            },
        });
    }
}
