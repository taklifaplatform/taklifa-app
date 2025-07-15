/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCartItemRequest } from '../models/AddCartItemRequest';
import type { CartItemTransformer } from '../models/CartItemTransformer';
import type { CartTransformer } from '../models/CartTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Get or create cart by company_id and identifier.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getOrCreateCart({
        companyId,
        identifier,
    }: {
        companyId: string,
        identifier: string,
    }): CancelablePromise<{
        data?: CartTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/{company_id}/{identifier}',
            path: {
                'company_id': companyId,
                'identifier': identifier,
            },
        });
    }
    /**
     * Get cart items.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCartItems({
        companyId,
        identifier,
    }: {
        companyId: string,
        identifier: string,
    }): CancelablePromise<{
        data?: CartItemTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/{company_id}/{identifier}/items',
            path: {
                'company_id': companyId,
                'identifier': identifier,
            },
        });
    }
    /**
     * Add item to cart.
     * @returns any Successful response
     * @throws ApiError
     */
    public static addCartItem({
        companyId,
        identifier,
        requestBody,
    }: {
        companyId: string,
        identifier: string,
        requestBody: AddCartItemRequest,
    }): CancelablePromise<{
        data?: CartTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/{company_id}/{identifier}/items',
            path: {
                'company_id': companyId,
                'identifier': identifier,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
