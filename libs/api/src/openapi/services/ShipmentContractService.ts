/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProposalPermissionTransformer } from '../models/ProposalPermissionTransformer';
import type { ShipmentContractTransformer } from '../models/ShipmentContractTransformer';
import type { ShipmentProposalTransformer } from '../models/ShipmentProposalTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShipmentContractService {
    /**
     * Convert Proposal into contract.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createProposalContract({
        shipmentProposal,
    }: {
        shipmentProposal: string,
    }): CancelablePromise<{
        data?: ShipmentProposalTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/shipments-proposals/{shipmentProposal}/create-contract',
            path: {
                'shipmentProposal': shipmentProposal,
            },
        });
    }
    /**
     * Fetch shipment contract.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchShipmentContract({
        shipmentContract,
    }: {
        shipmentContract: string,
    }): CancelablePromise<{
        data?: ShipmentContractTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shipment-contract/{shipmentContract}',
            path: {
                'shipmentContract': shipmentContract,
            },
        });
    }
    /**
     * Cancel contract.
     * @returns any Successful response
     * @throws ApiError
     */
    public static cancelContract({
        shipmentContract,
    }: {
        shipmentContract: string,
    }): CancelablePromise<{
        data?: ShipmentProposalTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/shipment-contract/{shipmentContract}',
            path: {
                'shipmentContract': shipmentContract,
            },
        });
    }
    /**
     * Retrieve current user contract permissions.
     * Can be used by (provider, customer)
     * @returns any Successful response
     * @throws ApiError
     */
    public static getPermissions({
        shipmentContract,
    }: {
        shipmentContract: string,
    }): CancelablePromise<{
        data?: ProposalPermissionTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/shipment-contract/{shipmentContract}/permissions',
            path: {
                'shipmentContract': shipmentContract,
            },
        });
    }
}
