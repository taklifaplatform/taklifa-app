/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServiceCategoryTransformer } from '../models/ServiceCategoryTransformer';
import type { ServiceTransformer } from '../models/ServiceTransformer';
import type { UpdateServiceRequest } from '../models/UpdateServiceRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServiceService {
    /**
     * Display the list of Services
     * @returns any Successful response
     * @throws ApiError
     */
    public static listServices({
        page,
        perPage,
        search,
        categoryId,
        subCategoryId,
        sortBy,
        sortDirection,
        years,
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
        categoryId?: any,
        subCategoryId?: any,
        sortBy?: 'created_at' | 'price',
        sortDirection?: 'asc' | 'desc',
        years?: string,
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
                'category_id': categoryId,
                'sub_category_id': subCategoryId,
                'sort_by': sortBy,
                'sort_direction': sortDirection,
                'years': years,
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
     * Retrieve a service
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveService({
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
    /**
     * Display the list of Service categories
     * @returns any Successful response
     * @throws ApiError
     */
    public static listServiceCategories({
        page,
        perPage,
        search,
        categoryId,
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
        categoryId?: any,
    }): CancelablePromise<{
        data?: Array<ServiceCategoryTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/service-categories',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'category_id': categoryId,
            },
        });
    }
}
