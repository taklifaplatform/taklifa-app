/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarModelTransformer } from './CarModelTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarGenerationTransformer = {
    id?: number;
    name?: string;
    year_begin?: string;
    year_end?: string;
    type?: Array<CarTypeTransformer>;
    model?: Array<CarModelTransformer>;
};

