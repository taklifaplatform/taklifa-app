/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyBranchTransformer } from '../models/CompanyBranchTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyBranchService {
    /**
     * Fetch all companies.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllBranches({
        company,
    }: {
        company: string,
    }): CancelablePromise<{
        data?: Array<CompanyBranchTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/companies/{company}/branches',
            path: {
                'company': company,
            },
        });
    }
    /**
     * Retrieve a company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveBranch({
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
            url: '/api/companies/{company}/branches/{companyBranch}',
            path: {
                'company': company,
                'companyBranch': companyBranch,
            },
        });
    }
}
