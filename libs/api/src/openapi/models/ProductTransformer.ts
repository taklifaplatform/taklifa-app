/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { ProductCategoryTransformer } from './ProductCategoryTransformer';
import type { ProductVariantTransformer } from './ProductVariantTransformer';
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
export type ProductTransformer = {
    id?: string;
    name?: string;
    description?: string | null;
    batch_product_id?: string | null;
    created_with_ai?: boolean;
    company?: SimpleCompanyTransformer;
    image?: MediaTransformer;
    images?: Array<MediaTransformer> | null;
    variant?: ProductVariantTransformer;
    category?: ProductCategoryTransformer;
    is_available?: boolean;
    created_at?: string;
    updated_at?: string;
};

