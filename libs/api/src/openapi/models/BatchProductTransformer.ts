/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { ProductTransformer } from './ProductTransformer';
import type { UserTransformer } from './UserTransformer';
export type BatchProductTransformer = {
    id?: string;
    user_id?: string;
    count?: number;
    published_count?: number;
    user?: UserTransformer;
    images?: Array<MediaTransformer> | null;
    products?: Array<ProductTransformer> | null;
    created_at?: string;
    updated_at?: string;
};

