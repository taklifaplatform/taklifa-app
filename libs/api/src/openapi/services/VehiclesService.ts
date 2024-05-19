/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateVehicleRequest } from '../models/UpdateVehicleRequest';
import type { VehicleTransformer } from '../models/VehicleTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VehiclesService {
    /**
     * Display a listing of the Vehicles.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchAllVehicles({
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
        data?: Array<VehicleTransformer>;
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
            url: '/api/manager/vehicles',
            query: {
                'page': page,
                'per_page': perPage,
                'search': search,
            },
        });
    }
    /**
     * Store a newly created Vehicle in storage.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createVehicle({
        requestBody,
    }: {
        requestBody: UpdateVehicleRequest,
    }): CancelablePromise<{
        data?: VehicleTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/manager/vehicles',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
    /**
     * Retrieve the specified Vehicle.
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieveVehicle({
        vehicle,
    }: {
        vehicle: string,
    }): CancelablePromise<{
        data?: VehicleTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/manager/vehicles/{vehicle}',
            path: {
                'vehicle': vehicle,
            },
        });
    }
    /**
     * Update the specified Vehicle in storage.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateVehicle({
        vehicle,
        requestBody,
    }: {
        vehicle: string,
        requestBody: UpdateVehicleRequest,
    }): CancelablePromise<{
        data?: VehicleTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/manager/vehicles/{vehicle}',
            path: {
                'vehicle': vehicle,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete the specified Vehicle from storage.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteVehicle({
        vehicle,
    }: {
        vehicle: string,
    }): CancelablePromise<{
        data?: VehicleTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/manager/vehicles/{vehicle}',
            path: {
                'vehicle': vehicle,
            },
        });
    }
}
