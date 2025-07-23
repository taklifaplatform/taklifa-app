/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductTransformer } from './ProductTransformer';
import type { ProductVariantTransformer } from './ProductVariantTransformer';
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
export type CartItemTransformer = {
    id?: string;
    cart_id?: string;
    product_id?: string;
    variant_id?: string;
    unit_price?: number;
    quantity?: number;
    total_price?: number;
    product?: ProductTransformer;
    variant?: ProductVariantTransformer;
    company?: SimpleCompanyTransformer;
};

