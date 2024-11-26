/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CapacityDimensionsUpdateVehicleRequest } from './CapacityDimensionsUpdateVehicleRequest';
import type { CapacityWeightUpdateVehicleRequest } from './CapacityWeightUpdateVehicleRequest';
import type { FuelInformationUpdateVehicleRequest } from './FuelInformationUpdateVehicleRequest';
import type { ImagesUpdateVehicleRequest } from './ImagesUpdateVehicleRequest';
import type { ImageUpdateVehicleRequest } from './ImageUpdateVehicleRequest';
import type { InformationUpdateVehicleRequest } from './InformationUpdateVehicleRequest';
export type UpdateVehicleRequest = {
    internal_id?: string;
    color?: string;
    plate_number?: string;
    vin_number?: string;
    year?: number;
    image?: ImageUpdateVehicleRequest;
    images?: Array<ImagesUpdateVehicleRequest>;
    model_id?: string;
    information?: InformationUpdateVehicleRequest;
    fuel_information?: FuelInformationUpdateVehicleRequest;
    capacity_dimensions?: CapacityDimensionsUpdateVehicleRequest;
    capacity_weight?: CapacityWeightUpdateVehicleRequest;
};

