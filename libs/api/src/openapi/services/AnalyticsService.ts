/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnouncementAnalyticTransformer } from '../models/AnnouncementAnalyticTransformer';
import type { UpdateAnnouncementAnalyticRequest } from '../models/UpdateAnnouncementAnalyticRequest';
import type { UpdateUserAnalyticRequest } from '../models/UpdateUserAnalyticRequest';
import type { UserAnalyticTransformer } from '../models/UserAnalyticTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsService {
    /**
     * Store new user analytic.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeUserAnalytic({
        user,
        requestBody,
    }: {
        user: string,
        requestBody: UpdateUserAnalyticRequest,
    }): CancelablePromise<{
        data?: UserAnalyticTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analytics/track/users/{user}',
            path: {
                'user': user,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Store new announcement analytic.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeAnnouncementAnalytic({
        announcement,
        requestBody,
    }: {
        announcement: string,
        requestBody: UpdateAnnouncementAnalyticRequest,
    }): CancelablePromise<{
        data?: AnnouncementAnalyticTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/analytics/track/announcements/{announcement}',
            path: {
                'announcement': announcement,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Get user analytics.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getUserAnalytics({
        user,
    }: {
        user: string,
    }): CancelablePromise<{
        data?: Array<UserAnalyticTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/track/users/{user}/analytics',
            path: {
                'user': user,
            },
        });
    }
    /**
     * Get announcement analytics.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getAnnouncementAnalytics({
        announcement,
    }: {
        announcement: string,
    }): CancelablePromise<{
        data?: Array<AnnouncementAnalyticTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/analytics/track/announcements/{announcement}/analytics',
            path: {
                'announcement': announcement,
            },
        });
    }
}
