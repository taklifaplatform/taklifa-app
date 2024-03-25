/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarGenerationTransformer } from './CarGenerationTransformer';
import type { CarModelTransformer } from './CarModelTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarSerieTransformer = {
    id?: number;
    name?: string;
    type?: Array<CarTypeTransformer>;
    model?: Array<CarModelTransformer>;
    generation?: Array<CarGenerationTransformer>;
};

