/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FaqTransformer } from '../models/FaqTransformer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FaqsService {
    /**
     * Display a listing of the Faqs.
     * @returns any Successful response
     * @throws ApiError
     */
    public static fetchListFaqs(): CancelablePromise<{
        data?: Array<FaqTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/faqs',
        });
    }
}
