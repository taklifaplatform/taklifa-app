/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentProposalTransformer } from '../models/ShipmentProposalTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShipmentProposalService {
    /**
     * Fetch all proposal for specific shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchShipmentProposals({
        shipment,
        page,
        perPage,
    }: {
        shipment: string,
        /**
         * Page number
         */
        page?: number,
        /**
         * Number of items per page
         */
        perPage?: number,
    }): CancelablePromise<{
        data?: Array<ShipmentProposalTransformer>;
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
            url: '/api/shipments/{shipment}/proposals',
            path: {
                'shipment': shipment,
            },
            query: {
                'page': page,
                'per_page': perPage,
            },
        });
    }
    /**
     * Retrieve a shipment invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveShipmentProposal({
        shipment,
        shipmentProposal,
    }: {
        shipment: string,
        shipmentProposal: string,
    }): CancelablePromise<{
        data?: ShipmentProposalTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shipments/{shipment}/proposals/{shipmentProposal}',
            path: {
                'shipment': shipment,
                'shipmentProposal': shipmentProposal,
            },
        });
    }
    /**
     * Reject shipment invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static acceptShipmentProposal({
        shipment,
        shipmentProposal,
    }: {
        shipment: string,
        shipmentProposal: string,
    }): CancelablePromise<{
        data?: ShipmentProposalTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/shipments/{shipment}/proposals/{shipmentProposal}/accept',
            path: {
                'shipment': shipment,
                'shipmentProposal': shipmentProposal,
            },
        });
    }
    /**
     * Decline shipment invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static declineShipmentProposal({
        shipment,
        shipmentProposal,
    }: {
        shipment: string,
        shipmentProposal: string,
    }): CancelablePromise<{
        data?: ShipmentProposalTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/shipments/{shipment}/proposals/{shipmentProposal}/reject',
            path: {
                'shipment': shipment,
                'shipmentProposal': shipmentProposal,
            },
        });
    }
}
