/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticatedUserTransformer } from '../models/AuthenticatedUserTransformer';
import type { CompanyTransformer } from '../models/CompanyTransformer';
import type { UpdateCompanyRequest } from '../models/UpdateCompanyRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyAdminService {
    /**
     * Fetch all companies.
     * @returns any Successful response
     * @throws ApiError
     */
    public static list({
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
            url: '/api/admin/companies',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Create new company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: UpdateCompanyRequest,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/companies',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Retrieve a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/companies/{company}',
            path: {
                'company': company,
            },
        });
    }
    /**
     * Update a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static update({
        company,
        requestBody,
    }: {
        company: string,
        requestBody: UpdateCompanyRequest,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/companies/{company}',
            path: {
                'company': company,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Delete a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static delete({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/companies/{company}',
            path: {
                'company': company,
            },
        });
    }
    /**
     * Active company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static changeActiveCompany({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/companies/{company}/change-active-company',
            path: {
                'company': company,
            },
        });
    }
}
