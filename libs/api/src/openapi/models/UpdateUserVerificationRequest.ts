/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdentityCardUpdateUserVerificationRequest } from './IdentityCardUpdateUserVerificationRequest';
import type { LocationUpdateUserVerificationRequest } from './LocationUpdateUserVerificationRequest';
export type UpdateUserVerificationRequest = {
    name?: string;
    birth_date?: string;
    nationality_id?: string;
    identity_card?: IdentityCardUpdateUserVerificationRequest;
    location?: LocationUpdateUserVerificationRequest;
};

