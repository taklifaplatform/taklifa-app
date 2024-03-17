/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarEquipmentTransformer } from './CarEquipmentTransformer';
import type { CarOptionTransformer } from './CarOptionTransformer';
import type { CarTypeTransformer } from './CarTypeTransformer';
export type CarOptionValueTransformer = {
    id?: number;
    is_base?: boolean;
    type?: Array<CarTypeTransformer>;
    option?: Array<CarOptionTransformer>;
    equipment?: Array<CarEquipmentTransformer>;
};

