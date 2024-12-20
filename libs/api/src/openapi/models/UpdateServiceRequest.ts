/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CoverUpdateServiceRequest } from './CoverUpdateServiceRequest';
import type { ImagesUpdateServiceRequest } from './ImagesUpdateServiceRequest';
export type UpdateServiceRequest = {
    title?: string;
    description?: string;
    cover?: CoverUpdateServiceRequest;
    images?: Array<ImagesUpdateServiceRequest>;
};

