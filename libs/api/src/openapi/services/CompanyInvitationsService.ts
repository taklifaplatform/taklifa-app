/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyInvitationTransformer } from '../models/CompanyInvitationTransformer';
import type { UpdateInvitationRequest } from '../models/UpdateInvitationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyInvitationsService {
    /**
     * Fetch All Company New Members Invitations.
     * @returns any Successful response
     * @throws ApiError
     */
    public static list({
        company,
        page,
        perPage,
        search,
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
        role?: 'manager' | 'driver',
    }): CancelablePromise<{
        data?: Array<CompanyInvitationTransformer>;
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
            url: '/api/admin/companies/{company}/invitation',
            path: {
                'company': company,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'role': role,
            },
        });
    }
    /**
     * Invite New Driver to Company
     * @returns void
     * @throws ApiError
     */
    public static create({
        company,
        requestBody,
    }: {
        company: string,
        requestBody: UpdateInvitationRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/companies/{company}/invitation',
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
     * Retrieve a Manager of Company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        company,
        companyInvitation,
    }: {
        company: string,
        companyInvitation: string,
    }): CancelablePromise<{
        data?: CompanyInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/companies/{company}/invitation/{companyInvitation}',
            path: {
                'company': company,
                'companyInvitation': companyInvitation,
            },
        });
    }
    /**
     * Update Driver Invitation
     * @returns void
     * @throws ApiError
     */
    public static update({
        company,
        companyInvitation,
        requestBody,
    }: {
        company: string,
        companyInvitation: string,
        requestBody: UpdateInvitationRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/companies/{company}/invitation/{companyInvitation}',
            path: {
                'company': company,
                'companyInvitation': companyInvitation,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Delete Driver Invitation
     * @returns any Successful response
     * @throws ApiError
     */
    public static delete({
        company,
        companyInvitation,
    }: {
        company: string,
        companyInvitation: string,
    }): CancelablePromise<{
        data?: CompanyInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/admin/companies/{company}/invitation/{companyInvitation}',
            path: {
                'company': company,
                'companyInvitation': companyInvitation,
            },
        });
    }
}
