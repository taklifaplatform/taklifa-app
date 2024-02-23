/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveCompanyTransformer } from './ActiveCompanyTransformer';
import type { MediaTransformer } from './MediaTransformer';
import type { UserSimpleRoleTransformer } from './UserSimpleRoleTransformer';
export type AuthenticatedUserTransformer = {
    id?: number;
    username?: string;
    name?: string;
    phone_number?: string;
    phone_number_has_whatsapp?: boolean;
    email?: string;
    email_verified_at?: string;
    about?: string;
    requested_user_type?: string;
    roles?: Array<UserSimpleRoleTransformer>;
    active_role?: UserSimpleRoleTransformer;
    companies?: Array<ActiveCompanyTransformer>;
    active_company?: ActiveCompanyTransformer;
    avatar?: MediaTransformer;
};

