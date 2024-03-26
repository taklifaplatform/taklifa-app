/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CityTransformer } from './CityTransformer';
import type { CountryTransformer } from './CountryTransformer';
import type { StateTransformer } from './StateTransformer';
export type LocationTransformer = {
    id?: number;
    latitude?: string;
    longitude?: string;
    address?: string;
    phone_number?: string;
    name?: string;
    is_primary?: boolean;
    city?: CityTransformer;
    state?: StateTransformer;
    country?: CountryTransformer;
};

