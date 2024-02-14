/* generated using openapi-typescript-codegen -- do no edit */
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
    VIN_number?: string;
    year?: number;
    image?: ImageUpdateVehicleRequest;
    images?: Array<ImagesUpdateVehicleRequest>;
    vehicle_make_id?: number;
    vehicle_model_id?: number;
    vehicle_icon_id?: number;
    information?: InformationUpdateVehicleRequest;
    fuel_information?: FuelInformationUpdateVehicleRequest;
    capacity_dimensions?: CapacityDimensionsUpdateVehicleRequest;
    capacity_weight?: CapacityWeightUpdateVehicleRequest;
};

