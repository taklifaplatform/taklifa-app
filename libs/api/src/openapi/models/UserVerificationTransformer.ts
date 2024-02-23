/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationTransformer } from './LocationTransformer';
import type { MediaTransformer } from './MediaTransformer';
export type UserVerificationTransformer = {
    id?: number;
    name?: string;
    birth_date?: string;
    nationality_id?: number;
    driving_license_number?: string;
    location?: LocationTransformer;
    identity_card?: MediaTransformer;
    driving_license_card?: MediaTransformer;
    assurance_card?: MediaTransformer;
};

