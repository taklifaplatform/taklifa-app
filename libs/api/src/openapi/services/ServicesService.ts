/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceTransformer } from '../models/ServiceTransformer';
import type { UpdateServiceRequest } from '../models/UpdateServiceRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServicesService {
    /**
     * Display the list of services
     * @returns any Successful response
     * @throws ApiError
     */
    public static listServices({
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
        data?: Array<ServiceTransformer>;
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
            url: '/api/services',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Store new Service.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createService({
        requestBody,
    }: {
        requestBody: UpdateServiceRequest,
    }): CancelablePromise<{
        data?: ServiceTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/services',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Display the list of services for a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static listCompanyServices({
        company,
        page,
        perPage,
        search,
    }: {
        company: string,
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
        data?: Array<ServiceTransformer>;
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
            url: '/api/services/companies/{company}/services',
            path: {
                'company': company,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Display the list of services for a driver
     * @returns any Successful response
     * @throws ApiError
     */
    public static listDriverServices({
        driver,
        page,
        perPage,
        search,
    }: {
        driver: string,
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
        data?: Array<ServiceTransformer>;
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
            url: '/api/services/drivers/{driver}/services',
            path: {
                'driver': driver,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Retrieve a service
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveZoneService({
        service,
    }: {
        service: string,
    }): CancelablePromise<{
        data?: ServiceTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/services/{service}',
            path: {
                'service': service,
            },
        });
    }
    /**
     * Update the specified Service.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateService({
        service,
        requestBody,
    }: {
        service: string,
        requestBody: UpdateServiceRequest,
    }): CancelablePromise<{
        data?: ServiceTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/services/{service}',
            path: {
                'service': service,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Remove the specified Service.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteService({
        service,
    }: {
        service: string,
    }): CancelablePromise<{
        data?: ServiceTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/services/{service}',
            path: {
                'service': service,
            },
        });
    }
}
