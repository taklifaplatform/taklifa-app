/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AssuranceCardDriverVerificationRequest } from './AssuranceCardDriverVerificationRequest';
import type { DrivingLicenseCardDriverVerificationRequest } from './DrivingLicenseCardDriverVerificationRequest';
export type DriverVerificationRequest = {
    driving_license_number?: string;
    driving_license_card?: DrivingLicenseCardDriverVerificationRequest;
    assurance_card?: AssuranceCardDriverVerificationRequest;
};

