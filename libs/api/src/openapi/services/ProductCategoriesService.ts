/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCategoryTransformer } from '../models/ProductCategoryTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductCategoriesService {
    /**
     * Display a listing of product categories.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listProductCategories({
        page,
        perPage,
        search,
        categoryId,
        parentId,
        perPage,
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
        categoryId?: string,
        parentId?: string,
        perPage?: '1',
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
            url: '/api/product-categories',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'category_id': categoryId,
                'parent_id': parentId,
                'per_page': perPage,
            },
        });
    }
    /**
     * Get all sub-categories for a specific parent category
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveSubCategories({
        parentId,
    }: {
        parentId: string,
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
            url: '/api/product-categories/{parentId}',
            path: {
                'parentId': parentId,
            },
        });
    }
}
