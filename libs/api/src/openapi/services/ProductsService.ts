/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchCreateProductRequest } from '../models/BatchCreateProductRequest';
import type { BatchProductTransformer } from '../models/BatchProductTransformer';
import type { ProductTransformer } from '../models/ProductTransformer';
import type { UpdateProductRequest } from '../models/UpdateProductRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Display a listing of products.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllProduct({
        page,
        perPage,
        search,
        companyId,
        orderBy,
        orderDirection,
        minPrice,
        maxPrice,
        includeUnpublished,
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
        companyId?: string,
        orderBy?: string,
        orderDirection?: string,
        minPrice?: any,
        maxPrice?: any,
        includeUnpublished?: any,
    }): CancelablePromise<{
        data?: Array<ProductTransformer>;
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
            url: '/api/products',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'company_id': companyId,
                'order_by': orderBy,
                'order_direction': orderDirection,
                'min_price': minPrice,
                'max_price': maxPrice,
                'include_unpublished': includeUnpublished,
            },
        });
    }
    /**
     * Store a newly created product.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeProduct({
        requestBody,
    }: {
        requestBody: UpdateProductRequest,
    }): CancelablePromise<{
        data?: ProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Display the specified product.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveProduct({
        product,
    }: {
        product: string,
    }): CancelablePromise<{
        data?: ProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{product}',
            path: {
                'product': product,
            },
        });
    }
    /**
     * Update the specified product.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateProduct({
        product,
        requestBody,
    }: {
        product: string,
        requestBody: UpdateProductRequest,
    }): CancelablePromise<{
        data?: ProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/products/{product}',
            path: {
                'product': product,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove the specified product.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteProduct({
        product,
    }: {
        product: string,
    }): CancelablePromise<{
        data?: ProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{product}',
            path: {
                'product': product,
            },
        });
    }
    /**
     * Publish the specified product.
     * @returns any Successful response
     * @throws ApiError
     */
    public static publishProduct({
        product,
    }: {
        product: string,
    }): CancelablePromise<{
        data?: ProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products/{product}/publish',
            path: {
                'product': product,
            },
        });
    }
    /**
     * Create a new batch of products using AI with provided images.
     * @returns any Successful response
     * @throws ApiError
     */
    public static batchCreateProducts({
        requestBody,
    }: {
        requestBody: BatchCreateProductRequest,
    }): CancelablePromise<{
        data?: BatchProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products/ai/batch-create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get or generate products from a batch using AI.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveBatchProducts({
        batchProduct,
    }: {
        batchProduct: string,
    }): CancelablePromise<{
        data?: Array<BatchProductTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/ai/batch-create/{batchProduct}/products',
            path: {
                'batchProduct': batchProduct,
            },
        });
    }
    /**
     * Publish a batch of products.
     * @returns any Successful response
     * @throws ApiError
     */
    public static publishBatchProducts({
        batchProduct,
    }: {
        batchProduct: string,
    }): CancelablePromise<{
        data?: BatchProductTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products/ai/batch-create/{batchProduct}/publish',
            path: {
                'batchProduct': batchProduct,
            },
        });
    }
}
