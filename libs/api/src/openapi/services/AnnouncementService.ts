/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnouncementCategoryTransformer } from '../models/AnnouncementCategoryTransformer';
import type { AnnouncementTransformer } from '../models/AnnouncementTransformer';
import type { UpdateAnnouncementRequest } from '../models/UpdateAnnouncementRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnnouncementService {
    /**
     * Display the list of announcements
     * @returns any Successful response
     * @throws ApiError
     */
    public static listAnnouncements({
        page,
        perPage,
        search,
        categoryId,
        subCategoryId,
        sortBy,
        sortDirection,
        years,
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
        categoryId?: any,
        subCategoryId?: any,
        sortBy?: 'created_at' | 'price',
        sortDirection?: 'asc' | 'desc',
        years?: string,
    }): CancelablePromise<{
        data?: Array<AnnouncementTransformer>;
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
            url: '/api/announcements',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'category_id': categoryId,
                'sub_category_id': subCategoryId,
                'sort_by': sortBy,
                'sort_direction': sortDirection,
                'years': years,
            },
        });
    }
    /**
     * Store new Service.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createAnnouncement({
        requestBody,
    }: {
        requestBody: UpdateAnnouncementRequest,
    }): CancelablePromise<{
        data?: AnnouncementTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/announcements',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Retrieve a service
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveAnnouncement({
        announcement,
    }: {
        announcement: string,
    }): CancelablePromise<{
        data?: AnnouncementTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/announcements/{announcement}',
            path: {
                'announcement': announcement,
            },
        });
    }
    /**
     * Update the specified Service.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateAnnouncement({
        announcement,
        requestBody,
    }: {
        announcement: string,
        requestBody: UpdateAnnouncementRequest,
    }): CancelablePromise<{
        data?: AnnouncementTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/announcements/{announcement}',
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
     * Remove the specified Service.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteAnnouncement({
        announcement,
    }: {
        announcement: string,
    }): CancelablePromise<{
        data?: AnnouncementTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/announcements/{announcement}',
            path: {
                'announcement': announcement,
            },
        });
    }
    /**
     * Display the list of announcement categories
     * @returns any Successful response
     * @throws ApiError
     */
    public static listAnnouncementCategories({
        page,
        perPage,
        search,
        categoryId,
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
        categoryId?: any,
    }): CancelablePromise<{
        data?: Array<AnnouncementCategoryTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/announcement-categories',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'category_id': categoryId,
            },
        });
    }
}
