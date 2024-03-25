/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarTrimTransformer } from '../models/CarTrimTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CarSeriesService {
    /**
     * Fetch all car trims for a single car model
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchCarTrimsBySerie({
        serieId,
        page,
        perPage,
        search,
    }: {
        serieId: string,
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
            url: '/api/cars/series/{serie_id}/trims',
            path: {
                'serie_id': serieId,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
}
