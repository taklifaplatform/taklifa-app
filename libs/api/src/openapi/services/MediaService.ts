/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteTemporaryRequest } from '../models/DeleteTemporaryRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MediaService {
    /**
     * Update the authenticated user.
     * @throws ApiError
     */
    public static deleteMedia({
        requestBody,
    }: {
        requestBody: DeleteTemporaryRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/media/uploads',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
