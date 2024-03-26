/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { VehicleCapacityDimensionsTransformer } from './VehicleCapacityDimensionsTransformer';
import type { VehicleCapacityWeightTransformer } from './VehicleCapacityWeightTransformer';
import type { VehicleFuelInformationTransformer } from './VehicleFuelInformationTransformer';
import type { VehicleInformationTransformer } from './VehicleInformationTransformer';
import type { VehicleModelTransformer } from './VehicleModelTransformer';
export type VehicleTransformer = {
    id?: number;
    internal_id?: string;
    color?: string;
    plate_number?: string;
    vin_number?: string;
    year?: string;
    image?: MediaTransformer;
    images?: Array<MediaTransformer>;
    model?: VehicleModelTransformer;
    information?: VehicleInformationTransformer;
    fuel_information?: VehicleFuelInformationTransformer;
    capacity_dimensions?: VehicleCapacityDimensionsTransformer;
    capacity_weight?: VehicleCapacityWeightTransformer;
};

