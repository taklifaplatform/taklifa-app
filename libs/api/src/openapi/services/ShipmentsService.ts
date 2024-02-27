/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentTransformer } from '../models/ShipmentTransformer';
import type { UpdateShipmentRequest } from '../models/UpdateShipmentRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShipmentsService {
    /**
     * Fetch all shipments.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllShipment({
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
        data?: Array<ShipmentTransformer>;
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
            url: '/api/shipment',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * store a new shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeShipment({
        requestBody,
    }: {
        requestBody: UpdateShipmentRequest,
    }): CancelablePromise<{
        data?: ShipmentTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/shipment',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Retrieve a shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveShipment({
        shipment,
    }: {
        shipment: string,
    }): CancelablePromise<{
        data?: ShipmentTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shipment/{shipment}',
            path: {
                'shipment': shipment,
            },
        });
    }
    /**
     * update a shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateShipment({
        shipment,
        requestBody,
    }: {
        shipment: string,
        requestBody: UpdateShipmentRequest,
    }): CancelablePromise<{
        data?: ShipmentTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/shipment/{shipment}',
            path: {
                'shipment': shipment,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * destroy a shipment.
     * @throws ApiError
     */
    public static destroyShipment({
        shipment,
    }: {
        shipment: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/shipment/{shipment}',
            path: {
                'shipment': shipment,
            },
        });
    }
}
