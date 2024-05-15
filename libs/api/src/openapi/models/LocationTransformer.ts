/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CityTransformer } from './CityTransformer';
import type { CountryTransformer } from './CountryTransformer';
import type { StateTransformer } from './StateTransformer';
export type LocationTransformer = {
    id?: string;
    owner_id?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    phone_number?: string;
    name?: string;
    is_primary?: boolean;
    building_name?: string;
    floor_number?: string;
    house_number?: string;
    city_id?: number;
    state_id?: number;
    country_id?: number;
    notes?: string | null;
    city?: CityTransformer;
    state?: StateTransformer;
    country?: CountryTransformer;
};

