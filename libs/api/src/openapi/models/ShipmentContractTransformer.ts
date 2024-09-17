/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from './CompanyTransformer';
import type { DriverTransformer } from './DriverTransformer';
export type ShipmentContractTransformer = {
    id?: number;
    status?: string;
    channel_id?: string;
    driver?: DriverTransformer;
    company?: CompanyTransformer;
    created_at?: string;
    updated_at?: string;
};

