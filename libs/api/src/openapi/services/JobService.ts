/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentTransformer } from '../models/ShipmentTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JobService {
    /**
     * List All public Jobs.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listJobs({
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
        data?: Array<ShipmentTransformer>;
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
            url: '/api/jobs',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Retrieve specific job.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveJob({
        job,
    }: {
        job: string,
    }): CancelablePromise<{
        data?: ShipmentTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/jobs/{job}',
            path: {
                'job': job,
            },
        });
    }
}
