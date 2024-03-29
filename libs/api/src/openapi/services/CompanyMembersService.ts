/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyMemberTransformer } from '../models/CompanyMemberTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyMembersService {
    /**
     * Delete member of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static delete({
        company,
        member,
    }: {
        company: string,
        member: string,
    }): CancelablePromise<{
        data?: CompanyMemberTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/companies/{company}/members/{member}',
            path: {
                'company': company,
                'member': member,
            },
        });
    }
    /**
     * Fetch all members of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static list({
        company,
        page,
        perPage,
        search,
        status,
        role,
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
        role?: 'company_driver' | 'company_manager',
    }): CancelablePromise<{
        data?: Array<CompanyMemberTransformer>;
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
            url: '/api/companies/{company}/members',
            path: {
                'company': company,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'status': status,
                'role': role,
            },
        });
    }
    /**
     * Retrieve member of a company
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        company,
        member,
    }: {
        company: string,
        member: string,
    }): CancelablePromise<{
        data?: CompanyMemberTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/companies/{company}/members/{member}',
            path: {
                'company': company,
                'member': member,
            },
        });
    }
}
