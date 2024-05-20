/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from './CompanyTransformer';
import type { DriverTransformer } from './DriverTransformer';
export type ShipmentInvitationTransformer = {
    id?: string;
    shipment_id?: string;
    status?: string;
    driver?: DriverTransformer;
    company?: CompanyTransformer;
};

