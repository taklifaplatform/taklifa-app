/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTransformer } from './LocationTransformer';
import type { PriceTransformer } from './PriceTransformer';
import type { ShipmentItemTransformer } from './ShipmentItemTransformer';
import type { UserTransformer } from './UserTransformer';
export type ShipmentTransformer = {
    id?: number;
    pick_date?: string | null;
    pick_time?: string | null;
    deliver_date?: string | null;
    deliver_time?: string | null;
    recipient_name?: string | null;
    recipient_phone?: string | null;
    items_type?: string;
    status?: string;
    user?: UserTransformer;
    from_location?: LocationTransformer;
    to_location?: LocationTransformer;
    min_budget?: PriceTransformer;
    max_budget?: PriceTransformer;
    items?: Array<ShipmentItemTransformer>;
    created_at?: string;
    updated_at?: string;
};

