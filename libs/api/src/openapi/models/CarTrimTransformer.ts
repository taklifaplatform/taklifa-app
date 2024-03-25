/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarModelTransformer } from './CarModelTransformer';
import type { CarSerieTransformer } from './CarSerieTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarTrimTransformer = {
    id?: number;
    name?: string;
    start_production_year?: string;
    end_production_year?: string;
    type?: Array<CarTypeTransformer>;
    model?: Array<CarModelTransformer>;
    serie?: Array<CarSerieTransformer>;
};

