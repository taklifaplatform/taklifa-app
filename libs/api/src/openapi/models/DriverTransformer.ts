/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTransformer } from './LocationTransformer';
import type { MediaTransformer } from './MediaTransformer';
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
import type { VehicleTransformer } from './VehicleTransformer';
export type DriverTransformer = {
    id?: number;
    username?: string;
    name?: string;
    phone_number?: string;
    about?: string;
    avatar?: MediaTransformer;
    companies?: Array<SimpleCompanyTransformer>;
    location?: LocationTransformer;
    rating_stats?: {
        score?: number;
        count?: number;
    };
    vehicle?: VehicleTransformer;
};

