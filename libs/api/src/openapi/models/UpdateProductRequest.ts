/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagesUpdateProductRequest } from './ImagesUpdateProductRequest';
import type { VariantUpdateProductRequest } from './VariantUpdateProductRequest';
export type UpdateProductRequest = {
    name?: string;
    description?: string;
    category_id?: string;
    variant?: VariantUpdateProductRequest;
    is_available?: boolean;
    images?: Array<ImagesUpdateProductRequest>;
};

