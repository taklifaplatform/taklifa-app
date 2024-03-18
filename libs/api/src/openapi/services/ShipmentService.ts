/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentFilterTransformer } from '../models/ShipmentFilterTransformer';
import type { ShipmentTransformer } from '../models/ShipmentTransformer';
import type { UpdateShipmentRequest } from '../models/UpdateShipmentRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShipmentService {
    /**
     * Fetch all shipments.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchShipmentFilters({
        page,
        perPage,
        search,
        status,
        itemsType,
        role,
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
        status?: string,
        itemsType?: 'document' | 'box' | 'multiple_boxes' | 'other',
        role?: 'customer' | 'company_owner' | 'company_manager' | 'company_driver' | 'solo_driver',
    }): CancelablePromise<{
        data?: Array<ShipmentFilterTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shipment-filters',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'status': status,
                'items_type': itemsType,
                'role': role,
            },
        });
    }
    /**
     * Fetch all shipments.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllShipment({
        page,
        perPage,
        search,
        status,
        itemsType,
        role,
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
        status?: string,
        itemsType?: 'document' | 'box' | 'multiple_boxes' | 'other',
        role?: 'customer' | 'company_owner' | 'company_manager' | 'company_driver' | 'solo_driver',
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
            url: '/api/shipments',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'status': status,
                'items_type': itemsType,
                'role': role,
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
            url: '/api/shipments',
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
            url: '/api/shipments/{shipment}',
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
            url: '/api/shipments/{shipment}',
            path: {
                'shipment': shipment,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * destroy a shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static destroyShipment({
        shipment,
    }: {
        shipment: string,
    }): CancelablePromise<{
        data?: ShipmentTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/shipments/{shipment}',
            path: {
                'shipment': shipment,
            },
        });
    }
}
