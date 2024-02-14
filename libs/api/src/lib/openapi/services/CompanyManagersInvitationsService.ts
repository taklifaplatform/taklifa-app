/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyManagerInvitationTransformer } from '../models/CompanyManagerInvitationTransformer';
import type { UpdateManagerInvitationRequest } from '../models/UpdateManagerInvitationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyManagersInvitationsService {
    /**
     * Fetch All Managers Of Company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllManagers({
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
        data?: Array<CompanyManagerInvitationTransformer>;
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
            url: '/api/manage/companies/{company}/manager-invitations',
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
     * Company Invite New Manager.
     * @returns void
     * @throws ApiError
     */
    public static inviteManager({
        company,
        requestBody,
    }: {
        company: string,
        requestBody: UpdateManagerInvitationRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/manage/companies/{company}/manager-invitations',
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
    public static retrieveManager({
        company,
        inviteRequest,
    }: {
        company: string,
        inviteRequest: string,
    }): CancelablePromise<{
        data?: CompanyManagerInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/manage/companies/{company}/manager-invitations/{inviteRequest}',
            path: {
                'company': company,
                'inviteRequest': inviteRequest,
            },
        });
    }
    /**
     * Update a Manager of Company.
     * @returns void
     * @throws ApiError
     */
    public static updateManager({
        company,
        inviteRequest,
        requestBody,
    }: {
        company: string,
        inviteRequest: string,
        requestBody: UpdateManagerInvitationRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/manage/companies/{company}/manager-invitations/{inviteRequest}',
            path: {
                'company': company,
                'inviteRequest': inviteRequest,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Delete a Manager of Company.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteManager({
        company,
        inviteRequest,
    }: {
        company: string,
        inviteRequest: string,
    }): CancelablePromise<{
        data?: CompanyManagerInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/manage/companies/{company}/manager-invitations/{inviteRequest}',
            path: {
                'company': company,
                'inviteRequest': inviteRequest,
            },
        });
    }
}
