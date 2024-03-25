/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarModelTransformer } from '../models/CarModelTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarMakesService {
    /**
     * Fetch all car models for a single car make.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarModelsByMake({
        makeId,
        page,
        perPage,
        search,
    }: {
        makeId: string,
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
            url: '/api/cars/makes/{make_id}/models',
            path: {
                'make_id': makeId,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
}
