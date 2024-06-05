/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserTransformer } from './UserTransformer';
export type NotificationTransformer = {
    id?: number;
    data?: {
        filter?: string;
        from_user_id?: string;
        type?: string;
        title?: string;
        description?: string;
        model_type?: string;
        model_id?: string;
    };
    read_at?: string;
    created_at?: string;
    updated_at?: string;
    sender?: UserTransformer;
};

