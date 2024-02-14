/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompanyTransformer } from './CompanyTransformer';
import type { UserTransformer } from './UserTransformer';
export type CompanyManagerInvitationTransformer = {
    id?: number;
    name?: string;
    phone_number?: string;
    email?: string;
    company?: CompanyTransformer;
    sender?: UserTransformer;
};

