/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LegalDocumentsUpdateCompanyRequest } from './LegalDocumentsUpdateCompanyRequest';
import type { LogoUpdateCompanyRequest } from './LogoUpdateCompanyRequest';
export type UpdateCompanyRequest = {
    name?: string;
    legal_documents?: Array<LegalDocumentsUpdateCompanyRequest>;
    logo?: LogoUpdateCompanyRequest;
    location_id?: string;
};

