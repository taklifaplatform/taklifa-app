/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateWorkingHoursRequest } from '../models/UpdateWorkingHoursRequest';
import type { WorkingHourTransformer } from '../models/WorkingHourTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkingHoursService {
    /**
     * Get Working hours by id
     * @returns any Successful response
     * @throws ApiError
     */
    public static retrieve({
        workingHour,
    }: {
        workingHour: string,
    }): CancelablePromise<{
        data?: WorkingHourTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/working-hours/{workingHour}',
            path: {
                'workingHour': workingHour,
            },
        });
    }
    /**
     * Get Working hours by id
     * @returns any Successful response
     * @throws ApiError
     */
    public static update({
        workingHour,
        requestBody,
    }: {
        workingHour: string,
        requestBody: UpdateWorkingHoursRequest,
    }): CancelablePromise<{
        data?: WorkingHourTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/working-hours/{workingHour}',
            path: {
                'workingHour': workingHour,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
