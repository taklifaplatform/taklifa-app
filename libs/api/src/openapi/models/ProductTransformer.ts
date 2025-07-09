/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from './CompanyTransformer';
import type { ProductVariantTransformer } from './ProductVariantTransformer';
export type ProductTransformer = {
    id?: string;
    name?: string;
    description?: string | null;
    company?: CompanyTransformer;
    variants?: Array<ProductVariantTransformer> | null;
};

