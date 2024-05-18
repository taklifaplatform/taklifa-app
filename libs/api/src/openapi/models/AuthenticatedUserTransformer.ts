/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaTransformer } from './MediaTransformer';
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
import type { UserSimpleRoleTransformer } from './UserSimpleRoleTransformer';
export type AuthenticatedUserTransformer = {
    id?: string;
    username?: string;
    name?: string;
    phone_number?: string;
    phone_number_has_whatsapp?: boolean;
    email?: string;
    email_verified_at?: string;
    verification_status?: string;
    about?: string;
    roles?: Array<UserSimpleRoleTransformer>;
    active_role?: UserSimpleRoleTransformer;
    companies?: Array<SimpleCompanyTransformer>;
    active_company?: SimpleCompanyTransformer;
    avatar?: MediaTransformer;
};

