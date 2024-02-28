/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTransformer } from './LocationTransformer';
import type { PriceTransformer } from './PriceTransformer';
import type { UserTransformer } from './UserTransformer';
export type ShipmentTransformer = {
    id?: number;
    user?: UserTransformer;
    from_location?: LocationTransformer;
    to_location?: LocationTransformer;
    pick_date?: string | null;
    pick_time?: string | null;
    deliver_date?: string | null;
    deliver_time?: string | null;
    recipient_name?: string | null;
    recipient_phone?: string | null;
    items_type?: string | null;
    status?: string | null;
    min_budget?: PriceTransformer;
    max_budget?: PriceTransformer;
};

