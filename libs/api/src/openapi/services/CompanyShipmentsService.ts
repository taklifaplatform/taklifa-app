/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentTransformer } from '../models/ShipmentTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompanyShipmentsService {
    /**
     * Fetch all shipments.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllShipment({
        company,
        page,
        perPage,
        search,
        status,
        itemsType,
    }: {
        company: string,
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
        search?: string,
        status?: 'draft' | 'searching' | 'delivering' | 'delivered' | 'cancelled' | 'pending' | 'expired' | 'rejected' | 'completed' | 'failed' | 'returned' | 'lost' | 'damaged' | 'stolen' | 'other',
        itemsType?: 'document' | 'box' | 'multiple_boxes' | 'other',
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
            url: '/api/company/{company}/shipments',
            path: {
                'company': company,
            },
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
                'status': status,
                'items_type': itemsType,
            },
        });
    }
    /**
     * Retrieve a shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveShipment({
        company,
        shipment,
    }: {
        company: string,
        shipment: string,
    }): CancelablePromise<{
        data?: ShipmentTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/company/{company}/shipments/{shipment}',
            path: {
                'company': company,
                'shipment': shipment,
            },
        });
    }
}
