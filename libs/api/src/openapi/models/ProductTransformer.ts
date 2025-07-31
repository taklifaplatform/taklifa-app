/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from './CompanyTransformer';
import type { MediaTransformer } from './MediaTransformer';
import type { ProductCategoryTransformer } from './ProductCategoryTransformer';
import type { ProductVariantTransformer } from './ProductVariantTransformer';
export type ProductTransformer = {
    id?: string;
    name?: string;
    short_description?: string | null;
    description?: string | null;
    batch_product_id?: string | null;
    created_with_ai?: boolean;
    company?: CompanyTransformer;
    image?: MediaTransformer;
    images?: Array<MediaTransformer> | null;
    variant?: ProductVariantTransformer;
    category?: ProductCategoryTransformer;
    is_available?: boolean;
    is_published?: boolean;
    created_at?: string;
    updated_at?: string;
    extracted_tags?: Array<string> | null;
    extracted_colors?: Array<{
        name?: string;
        hex?: string;
    }> | null;
    extracted_details?: Array<{
        name?: string;
        value?: string;
    }> | null;
};

