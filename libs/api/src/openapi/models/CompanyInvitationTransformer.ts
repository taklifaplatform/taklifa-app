/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
import type { UserTransformer } from './UserTransformer';
export type CompanyInvitationTransformer = {
    id?: string;
    name?: string;
    role?: string;
    phone_number?: string;
    email?: string;
    company?: SimpleCompanyTransformer;
    existing_user?: UserTransformer;
    sender?: UserTransformer;
};

