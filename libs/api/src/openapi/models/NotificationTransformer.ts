/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserTransformer } from './UserTransformer';
export type NotificationTransformer = {
    id?: number;
    data?: {
        title?: string;
        message?: string;
        icon?: string;
    };
    read_at?: string;
    created_at?: string;
    updated_at?: string;
    sender?: UserTransformer;
};

