/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LegalDocumentUpdateCompanyRequest } from './LegalDocumentUpdateCompanyRequest';
import type { LocationUpdateCompanyRequest } from './LocationUpdateCompanyRequest';
import type { LogoUpdateCompanyRequest } from './LogoUpdateCompanyRequest';
export type UpdateCompanyRequest = {
    name?: string;
    legal_document?: LegalDocumentUpdateCompanyRequest;
    logo?: LogoUpdateCompanyRequest;
    location?: LocationUpdateCompanyRequest;
};

