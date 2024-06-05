/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from './CompanyTransformer';
import type { DriverTransformer } from './DriverTransformer';
import type { PriceTransformer } from './PriceTransformer';
export type ShipmentProposalTransformer = {
    id?: string;
    shipment_id?: string;
    channel_id?: string;
    status?: string;
    driver?: DriverTransformer;
    company?: CompanyTransformer;
    cost?: PriceTransformer;
    fee?: PriceTransformer;
};

