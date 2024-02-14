/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyUserTransformer } from '../models/CompanyUserTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyManagersService {
    /**
     * Fetch all managers of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllManagers({
        company,
        page,
        perPage,
        search,
        status,
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
        status?: 'online' | 'busy' | 'offline',
    }): CancelablePromise<{
        data?: Array<CompanyUserTransformer>;
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
            url: '/api/manage/companies/{company}/managers',
            path: {
                'company': company,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'status': status,
            },
        });
    }
    /**
     * Retrieve manager of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveManager({
        company,
        manager,
    }: {
        company: string,
        manager: string,
    }): CancelablePromise<{
        data?: CompanyUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/manage/companies/{company}/managers/{manager}',
            path: {
                'company': company,
                'manager': manager,
            },
        });
    }
    /**
     * Delete manager of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteManager({
        company,
        manager,
    }: {
        company: string,
        manager: string,
    }): CancelablePromise<{
        data?: CompanyUserTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/manage/companies/{company}/managers/{manager}',
            path: {
                'company': company,
                'manager': manager,
            },
        });
    }
}
