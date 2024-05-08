/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AcceptInvitationRequest } from '../models/AcceptInvitationRequest';
import type { ShipmentInvitationTransformer } from '../models/ShipmentInvitationTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShipmentInvitationService {
    /**
     * Fetch all invitations for specific shipment.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchShipmentInvitations({
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
        data?: Array<ShipmentInvitationTransformer>;
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
            url: '/api/shipments/{shipment}/invitations',
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
    public static retrieveShipmentInvitation({
        shipment,
        shipmentInvitation,
    }: {
        shipment: string,
        shipmentInvitation: string,
    }): CancelablePromise<{
        data?: ShipmentInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shipments/{shipment}/invitations/{shipmentInvitation}',
            path: {
                'shipment': shipment,
                'shipmentInvitation': shipmentInvitation,
            },
        });
    }
    /**
     * Reject shipment invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static acceptShipmentInvitation({
        shipment,
        shipmentInvitation,
        requestBody,
    }: {
        shipment: string,
        shipmentInvitation: string,
        requestBody: AcceptInvitationRequest,
    }): CancelablePromise<{
        data?: ShipmentInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/shipments/{shipment}/invitations/{shipmentInvitation}/accept',
            path: {
                'shipment': shipment,
                'shipmentInvitation': shipmentInvitation,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Reject shipment invitation.
     * @returns any Successful response
     * @throws ApiError
     */
    public static declineShipmentInvitation({
        shipment,
        shipmentInvitation,
    }: {
        shipment: string,
        shipmentInvitation: string,
    }): CancelablePromise<{
        data?: ShipmentInvitationTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/shipments/{shipment}/invitations/{shipmentInvitation}/decline',
            path: {
                'shipment': shipment,
                'shipmentInvitation': shipmentInvitation,
            },
        });
    }
}
