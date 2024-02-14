/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcceptInviteRequest } from '../models/AcceptInviteRequest';
import type { AuthTokenTransformer } from '../models/AuthTokenTransformer';
import type { CompanyDriverInvitationTransformer } from '../models/CompanyDriverInvitationTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DriverAcceptInvitationService {
    /**
     * Driver Retrieve Invitation By Code.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveInvitation({
        code,
    }: {
        code: string,
    }): CancelablePromise<{
        data?: CompanyDriverInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/driver/invitations/{code}',
            path: {
                'code': code,
            },
        });
    }
    /**
     * Driver Accept a invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static acceptInvitation({
        code,
        requestBody,
    }: {
        code: string,
        requestBody: AcceptInviteRequest,
    }): CancelablePromise<{
        data?: AuthTokenTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/driver/invitations/{code}',
            path: {
                'code': code,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
