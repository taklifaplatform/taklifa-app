/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MainProductCategoryTransformer } from '../models/MainProductCategoryTransformer';
import type { ProductCategoryTransformer } from '../models/ProductCategoryTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductCategoriesService {
    /**
     * Display all parent categories.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listParentCategories({
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
        data?: Array<ProductCategoryTransformer>;
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
            url: '/api/product-categories/parents',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Retrieve a specific main category with categories.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveMainCategory({
        categoryId,
    }: {
        categoryId: string,
    }): CancelablePromise<{
        data?: MainProductCategoryTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/product-categories/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }
    /**
     * Retrieve sub-categories for a specific main category.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveSubCategories({
        mainCategoryId,
        page,
        perPage,
        search,
    }: {
        mainCategoryId: string,
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
        data?: Array<MainProductCategoryTransformer>;
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
            url: '/api/product-categories/{mainCategoryId}/sub-categories',
            path: {
                'mainCategoryId': mainCategoryId,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
}
