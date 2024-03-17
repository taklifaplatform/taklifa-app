/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarEquipmentTransformer } from '../models/CarEquipmentTransformer';
import type { CarGenerationTransformer } from '../models/CarGenerationTransformer';
import type { CarMakeTransformer } from '../models/CarMakeTransformer';
import type { CarModelTransformer } from '../models/CarModelTransformer';
import type { CarOptionTransformer } from '../models/CarOptionTransformer';
import type { CarOptionValueTransformer } from '../models/CarOptionValueTransformer';
import type { CarSerieTransformer } from '../models/CarSerieTransformer';
import type { CarSpecificationTransformer } from '../models/CarSpecificationTransformer';
import type { CarSpecificationValueTransformer } from '../models/CarSpecificationValueTransformer';
import type { CarTrimTransformer } from '../models/CarTrimTransformer';
import type { CarTypeTransformer } from '../models/CarTypeTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarTypesService {
    /**
     * Fetch all car types.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllCarType({
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
        data?: Array<CarTypeTransformer>;
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
            url: '/api/cars/types',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car makes for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarMakesByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarMakeTransformer>;
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
            url: '/api/cars/types/{car_type}/makes',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car models for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarModelsByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarModelTransformer>;
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
            url: '/api/cars/types/{car_type}/models',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car generations for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarGenerationsByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarGenerationTransformer>;
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
            url: '/api/cars/types/{car_type}/generations',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car series for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarSeriesByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarSerieTransformer>;
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
            url: '/api/cars/types/{car_type}/series',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car trims for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarTrimsByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarTrimTransformer>;
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
            url: '/api/cars/types/{car_type}/trims',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car equipments for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarEquipmentsByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarEquipmentTransformer>;
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
            url: '/api/cars/types/{car_type}/equipments',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car options for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarOptionsByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarOptionTransformer>;
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
            url: '/api/cars/types/{car_type}/options',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car option values for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarOptionValuesByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarOptionValueTransformer>;
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
            url: '/api/cars/types/{car_type}/option-values',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car specifications for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarSpecificationsByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarSpecificationTransformer>;
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
            url: '/api/cars/types/{car_type}/specifications',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car specification values for a single car type.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarSpecificationValuesByType({
        carType,
        page,
        perPage,
        search,
    }: {
        carType: string,
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
        data?: Array<CarSpecificationValueTransformer>;
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
            url: '/api/cars/types/{car_type}/specification-values',
            path: {
                'car_type': carType,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
}
