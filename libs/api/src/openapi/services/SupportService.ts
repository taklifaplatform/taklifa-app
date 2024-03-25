/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReportReasonTransformer } from '../models/ReportReasonTransformer';
import type { ReportTransformer } from '../models/ReportTransformer';
import type { StoreReportRequest } from '../models/StoreReportRequest';
import type { StoreSupportRequest } from '../models/StoreSupportRequest';
import type { SupportCategoryTransformer } from '../models/SupportCategoryTransformer';
import type { SupportTransformer } from '../models/SupportTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SupportService {
    /**
     * Display a listing of the support categories.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchSupportCategories(): CancelablePromise<{
        data?: SupportCategoryTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/support/categories',
        });
    }
    /**
     * Create new support request.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeSupportRequest({
        requestBody,
    }: {
        requestBody: StoreSupportRequest,
    }): CancelablePromise<{
        data?: SupportTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/support',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Display a listing of the Report Reasons.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchSupportCategories1(): CancelablePromise<{
        data?: ReportReasonTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/support/report-reasons',
        });
    }
    /**
     * Create new report.
     * @returns any Successful response
     * @throws ApiError
     */
    public static storeReport({
        requestBody,
    }: {
        requestBody: StoreReportRequest,
    }): CancelablePromise<{
        data?: ReportTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/support/reports',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation errors`,
            },
        });
    }
}
