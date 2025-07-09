/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagesUpdateServiceRequest } from './ImagesUpdateServiceRequest';
export type UpdateServiceRequest = {
    title?: string;
    description?: string;
    price?: string;
    category_id?: string;
    sub_category_id?: string;
    metadata?: Array<string>;
    city?: string;
    images?: Array<ImagesUpdateServiceRequest>;
};

