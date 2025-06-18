/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyBranchTransformer } from '../models/CompanyBranchTransformer';
import type { UpdateCompanyBranchRequest } from '../models/UpdateCompanyBranchRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyBranchAdminService {
    /**
     * Fetch all branches for a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static list({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: Array<CompanyBranchTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/companies/{company}/branches',
            path: {
                'company': company,
            },
        });
    }
    /**
     * Create a new branch.
     * @returns any Successful response
     * @throws ApiError
     */
    public static create({
        company,
        requestBody,
    }: {
        company: string,
        requestBody: UpdateCompanyBranchRequest,
    }): CancelablePromise<{
        data?: CompanyBranchTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/companies/{company}/branches',
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
     * Retrieve a branch.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        company,
        companyBranch,
    }: {
        company: string,
        companyBranch: string,
    }): CancelablePromise<{
        data?: CompanyBranchTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/companies/{company}/branches/{companyBranch}',
            path: {
                'company': company,
                'companyBranch': companyBranch,
            },
        });
    }
    /**
     * Update a branch.
     * @returns any Successful response
     * @throws ApiError
     */
    public static update({
        company,
        companyBranch,
        requestBody,
    }: {
        company: string,
        companyBranch: string,
        requestBody: UpdateCompanyBranchRequest,
    }): CancelablePromise<{
        data?: CompanyBranchTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/admin/companies/{company}/branches/{companyBranch}',
            path: {
                'company': company,
                'companyBranch': companyBranch,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Delete a branch.
     * @returns any Successful response
     * @throws ApiError
     */
    public static delete({
        company,
        companyBranch,
    }: {
        company: string,
        companyBranch: string,
    }): CancelablePromise<{
        data?: CompanyBranchTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/companies/{company}/branches/{companyBranch}',
            path: {
                'company': company,
                'companyBranch': companyBranch,
            },
        });
    }
}
