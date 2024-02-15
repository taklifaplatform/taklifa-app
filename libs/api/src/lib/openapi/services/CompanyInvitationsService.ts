/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyDriverInvitationTransformer } from '../models/CompanyDriverInvitationTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyInvitationsService {
    /**
     * Fetch All Driver Invitations
     * @returns any Successful response
     * @throws ApiError
     */
    public static sentInvitation({
        companyInvitation,
    }: {
        companyInvitation: string,
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
            url: '/api/company/invitations/{companyInvitation}',
            path: {
                'companyInvitation': companyInvitation,
            },
        });
    }
}
