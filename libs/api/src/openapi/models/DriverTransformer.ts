/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LiveLocationTransformer } from './LiveLocationTransformer';
import type { LocationTransformer } from './LocationTransformer';
import type { MediaTransformer } from './MediaTransformer';
import type { SimpleCompanyTransformer } from './SimpleCompanyTransformer';
import type { UserSimpleRoleTransformer } from './UserSimpleRoleTransformer';
export type DriverTransformer = {
    id?: number;
    username?: string;
    name?: string;
    phone_number?: string;
    latest_activity?: string;
    working_hours_id?: string;
    about?: string;
    avatar?: MediaTransformer;
    companies?: Array<SimpleCompanyTransformer>;
    location?: LocationTransformer;
    live_location?: LiveLocationTransformer;
    location_id?: string;
    urgency_service_provider?: boolean;
    urgency_service_radius?: number;
    rating_stats?: {
        score?: number;
        count?: number;
    };
    roles?: Array<UserSimpleRoleTransformer>;
};

