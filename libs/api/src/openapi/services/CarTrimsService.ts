/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarEquipmentTransformer } from '../models/CarEquipmentTransformer';
import type { CarSpecificationValueTransformer } from '../models/CarSpecificationValueTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarTrimsService {
    /**
     * Fetch all car specification values for a single car trim
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarSpecificationValuesByTrim({
        trimId,
        page,
        perPage,
        search,
    }: {
        trimId: string,
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
            url: '/api/cars/trims/{trim_id}/specification-values',
            path: {
                'trim_id': trimId,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Fetch all car equipments for a single car trim
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarEquipmentsByTrim({
        trimId,
        page,
        perPage,
        search,
    }: {
        trimId: string,
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
            url: '/api/cars/trims/{trim_id}/equipments',
            path: {
                'trim_id': trimId,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
}
