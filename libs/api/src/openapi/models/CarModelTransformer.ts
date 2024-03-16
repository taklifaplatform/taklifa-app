/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarMakeTransformer } from './CarMakeTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarModelTransformer = {
    id?: number;
    name?: string;
    type?: Array<CarTypeTransformer>;
    make?: Array<CarMakeTransformer>;
};

