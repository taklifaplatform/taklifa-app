/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthTokenTransformer } from '../models/AuthTokenTransformer';
import type { CompanyInvitationTransformer } from '../models/CompanyInvitationTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyMemberInvitationService {
    /**
     * Driver Retrieve Invitation By Code.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        invitationCode,
    }: {
        invitationCode: string,
    }): CancelablePromise<{
        data?: CompanyInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/company-invitation/{invitationCode}',
            path: {
                'invitationCode': invitationCode,
            },
        });
    }
    /**
     * Driver Accept a invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static accept({
        invitationCode,
    }: {
        invitationCode: string,
    }): CancelablePromise<{
        data?: AuthTokenTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/company-invitation/{invitationCode}',
            path: {
                'invitationCode': invitationCode,
            },
        });
    }
    /**
     * Driver Reject a invitation.
     * @throws ApiError
     */
    public static reject({
        invitationCode,
    }: {
        invitationCode: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/company-invitation/{invitationCode}/reject',
            path: {
                'invitationCode': invitationCode,
            },
        });
    }
}
