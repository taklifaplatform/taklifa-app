/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarTrimTransformer } from './CarTrimTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarEquipmentTransformer = {
    id?: number;
    name?: string;
    year?: string;
    type?: Array<CarTypeTransformer>;
    trim?: Array<CarTrimTransformer>;
};

