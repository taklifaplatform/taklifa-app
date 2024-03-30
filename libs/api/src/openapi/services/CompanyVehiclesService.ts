/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VehicleTransformer } from '../models/VehicleTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyVehiclesService {
    /**
     * Fetch all vehicles of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static list({
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
        data?: Array<VehicleTransformer>;
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
            url: '/api/companies/{company}/vehicles',
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
     * Retrieve vehicle of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        company,
        vehicle,
    }: {
        company: string,
        vehicle: string,
    }): CancelablePromise<{
        data?: VehicleTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/companies/{company}/vehicles/{vehicle}',
            path: {
                'company': company,
                'vehicle': vehicle,
            },
        });
    }
}
