/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCartItemRequest } from '../models/AddCartItemRequest';
import type { CartTransformer } from '../models/CartTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Get cart by code.
     * @returns any Successful response
     * @throws ApiError
     */
    public static getCart({
        code,
    }: {
        code: string,
    }): CancelablePromise<{
        data?: CartTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/{code}',
            path: {
                'code': code,
            },
        });
    }
    /**
     * Add item to cart.
     * @returns any Successful response
     * @throws ApiError
     */
    public static addItem({
        code,
        requestBody,
    }: {
        code: string,
        requestBody: AddCartItemRequest,
    }): CancelablePromise<{
        data?: CartTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/{code}/items',
            path: {
                'code': code,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Clean Cart Items
     * @returns any Successful response
     * @throws ApiError
     */
    public static cleanCart({
        code,
    }: {
        code: string,
    }): CancelablePromise<{
        data?: CartTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cart/{code}/items',
            path: {
                'code': code,
            },
        });
    }
}
