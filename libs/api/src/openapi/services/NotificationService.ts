/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationStatusTransformer } from '../models/NotificationStatusTransformer';
import type { NotificationTransformer } from '../models/NotificationTransformer';
import type { StorePushNotificationTokenRequest } from '../models/StorePushNotificationTokenRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationService {
    /**
     * List current user notifications.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listNotifications({
        page,
        perPage,
        search,
    }: {
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
        data?: Array<NotificationTransformer>;
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
            url: '/api/notifications',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Mark notification as read.
     * @returns any Successful response
     * @throws ApiError
     */
    public static markAllNotificationsAsRead(): CancelablePromise<{
        data?: NotificationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/notifications/mark-all-as-read',
        });
    }
    /**
     * Get unread notification count.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getUnreadNotificationCount(): CancelablePromise<{
        data?: NotificationStatusTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/notifications/unread-count',
        });
    }
    /**
     * Store the Expo push notification token.
     * @throws ApiError
     */
    public static storeExpoToken({
        requestBody,
    }: {
        requestBody: StorePushNotificationTokenRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/notifications/expo-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
