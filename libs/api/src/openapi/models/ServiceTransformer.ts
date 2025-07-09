/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { PriceTransformer } from './PriceTransformer';
import type { UserTransformer } from './UserTransformer';
export type ServiceTransformer = {
    id?: number;
    user?: UserTransformer;
    title?: string;
    description?: string;
    price?: PriceTransformer;
    city?: string;
    metadata?: any[];
    metadata_fields?: any[];
    category_id?: number;
    sub_category_id?: number;
    images?: MediaTransformer;
    views_count?: number;
    likes_count?: number;
    comments_count?: number;
    created_at?: string;
};

