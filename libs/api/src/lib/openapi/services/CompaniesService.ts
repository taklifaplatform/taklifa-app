/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticatedUserTransformer } from '../models/AuthenticatedUserTransformer';
import type { CompanyTransformer } from '../models/CompanyTransformer';
import type { UpdateCompanyRequest } from '../models/UpdateCompanyRequest';
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
    /**
     * Create new company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createCompany({
        requestBody,
    }: {
        requestBody: UpdateCompanyRequest,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/manage/companies',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Update a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateCompany({
        company,
        requestBody,
    }: {
        company: string,
        requestBody: UpdateCompanyRequest,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/manage/companies/{company}',
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
    public static deleteCompany({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: CompanyTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/manage/companies/{company}',
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
    public static setAsUserActiveCompany({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: AuthenticatedUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/manage/companies/{company}/set-user-activate',
            path: {
                'company': company,
            },
        });
    }
}
