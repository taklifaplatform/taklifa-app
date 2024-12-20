/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DriverTransformer } from './DriverTransformer';
import type { MediaTransformer } from './MediaTransformer';
import type { PriceTransformer } from './PriceTransformer';
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
export type ServiceTransformer = {
    id?: number;
    companies?: SimpleCompanyTransformer;
    driver?: DriverTransformer;
    title?: string;
    description?: string;
    cover?: MediaTransformer;
    images?: MediaTransformer;
    price?: PriceTransformer;
};

