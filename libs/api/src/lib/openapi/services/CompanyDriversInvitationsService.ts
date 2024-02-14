/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyDriverInvitationTransformer } from '../models/CompanyDriverInvitationTransformer';
import type { UpdateDriverInvitationRequest } from '../models/UpdateDriverInvitationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyDriversInvitationsService {
    /**
     * Fetch All Driver Invitations
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchDriverInvitations({
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
        data?: Array<CompanyDriverInvitationTransformer>;
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
            url: '/api/manage/companies/{company}/driver-invitations',
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
     * Invite New Driver to Company
     * @returns void
     * @throws ApiError
     */
    public static inviteDriver({
        company,
        requestBody,
    }: {
        company: string,
        requestBody: UpdateDriverInvitationRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/manage/companies/{company}/driver-invitations',
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
     * Retrieve Driver Invitation
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveDriverInvitation({
        company,
        inviteRequest,
    }: {
        company: string,
        inviteRequest: string,
    }): CancelablePromise<{
        data?: CompanyDriverInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/manage/companies/{company}/driver-invitations/{inviteRequest}',
            path: {
                'company': company,
                'inviteRequest': inviteRequest,
            },
        });
    }
    /**
     * Update Driver Invitation
     * @returns void
     * @throws ApiError
     */
    public static updateDriverInvitation({
        company,
        inviteRequest,
        requestBody,
    }: {
        company: string,
        inviteRequest: string,
        requestBody: UpdateDriverInvitationRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/manage/companies/{company}/driver-invitations/{inviteRequest}',
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
     * Delete Driver Invitation
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteDriverInvitation({
        company,
        inviteRequest,
    }: {
        company: string,
        inviteRequest: string,
    }): CancelablePromise<{
        data?: CompanyDriverInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/manage/companies/{company}/driver-invitations/{inviteRequest}',
            path: {
                'company': company,
                'inviteRequest': inviteRequest,
            },
        });
    }
}
