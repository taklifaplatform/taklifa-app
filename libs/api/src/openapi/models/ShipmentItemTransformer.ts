/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { ShipmentTransformer } from './ShipmentTransformer';
export type ShipmentItemTransformer = {
    id?: number;
    shipment_id?: ShipmentTransformer;
    medias?: Array<MediaTransformer>;
    notes?: string | null;
    dim_width?: number | null;
    dim_height?: number | null;
    dim_length?: number | null;
    cap_unit?: string | null;
    cap_weight?: number | null;
    content?: string | null;
    content_value?: number | null;
};

