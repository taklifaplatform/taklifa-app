/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VehicleModelTransformer } from '../models/VehicleModelTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VehicleModelService {
    /**
     * Fetch listing of the Vehicle Models.
     * @returns any Successful response
     * @throws ApiError
     */
    public static list(): CancelablePromise<{
        data?: Array<VehicleModelTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/vehicle-models',
        });
    }
}
