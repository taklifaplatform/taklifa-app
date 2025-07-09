/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CartItemTransformer } from './CartItemTransformer';
export type CartTransformer = {
    id?: string;
    user_id?: string | null;
    device_identifier?: string;
    company_id?: string;
    total_items?: number;
    total_cost?: number;
    items?: Array<CartItemTransformer> | null;
};

