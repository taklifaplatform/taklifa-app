/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { PriceTransformer } from './PriceTransformer';
import type { UserTransformer } from './UserTransformer';
export type AnnouncementTransformer = {
    id?: number;
    user?: UserTransformer;
    title?: string;
    description?: string;
    price?: PriceTransformer;
    images?: MediaTransformer;
};

