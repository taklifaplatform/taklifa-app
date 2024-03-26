/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from '../models/CompanyTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompaniesService {
    /**
     * Fetch all companies.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllCompanies({
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
        data?: Array<CompanyTransformer>;
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
            url: '/api/companies',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Retrieve a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveCompany({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/companies/{company}',
            path: {
                'company': company,
            },
        });
    }
}
