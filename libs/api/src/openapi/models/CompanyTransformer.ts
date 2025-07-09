/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyBranchTransformer } from './CompanyBranchTransformer';
import type { MediaTransformer } from './MediaTransformer';
export type CompanyTransformer = {
    id?: string;
    name?: string;
    about?: string;
    contact_number?: string;
    logo?: MediaTransformer;
    location_id?: string;
    rating_stats?: {
        score?: number;
        count?: number;
    };
    branches?: CompanyBranchTransformer;
};

