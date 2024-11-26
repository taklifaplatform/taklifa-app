/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemRatingTransformer } from '../models/ItemRatingTransformer';
import type { RatingTypeTransformer } from '../models/RatingTypeTransformer';
import type { UpdateRatingRequest } from '../models/UpdateRatingRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RatingService {
    /**
     * Fetch Ratings Types.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchRatingTypes(): CancelablePromise<{
        data?: Array<RatingTypeTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/rating-types',
        });
    }
    /**
     * Fetch All Ratings.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchRatings({
        id,
        type,
        page,
        perPage,
    }: {
        id: string,
        type: 'driver' | 'company',
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
    }): CancelablePromise<{
        data?: Array<ItemRatingTransformer>;
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
            url: '/api/ratings/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'type': type,
            },
        });
    }
    /**
     * Store Rating.
     * @returns void
     * @throws ApiError
     */
    public static storeRating({
        requestBody,
    }: {
        requestBody: UpdateRatingRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/rating',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
}
