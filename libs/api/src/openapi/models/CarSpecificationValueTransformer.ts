/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarSpecificationTransformer } from './CarSpecificationTransformer';
import type { CarTrimTransformer } from './CarTrimTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarSpecificationValueTransformer = {
    id?: number;
    value?: string;
    unit?: string;
    type?: Array<CarTypeTransformer>;
    trim?: Array<CarTrimTransformer>;
    specification?: Array<CarSpecificationTransformer>;
};

