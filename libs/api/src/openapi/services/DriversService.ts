/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DriverTransformer } from '../models/DriverTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DriversService {
    /**
     * Fetch all drivers.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllDrivers({
        page,
        perPage,
        latitude,
        longitude,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
        latitude?: any,
        longitude?: any,
    }): CancelablePromise<{
        data?: Array<DriverTransformer>;
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
            url: '/api/drivers',
            query: {
                'page': page,
                'per_page': perPage,
                'latitude': latitude,
                'longitude': longitude,
            },
        });
    }
    /**
     * Retrieve a driver.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveDriver({
        driver,
    }: {
        driver: string,
    }): CancelablePromise<{
        data?: DriverTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/drivers/{driver}',
            path: {
                'driver': driver,
            },
        });
    }
}
