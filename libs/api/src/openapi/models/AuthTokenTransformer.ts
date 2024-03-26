/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessTokenTransformer } from './AccessTokenTransformer';
import type { AuthenticatedUserTransformer } from './AuthenticatedUserTransformer';
export type AuthTokenTransformer = {
    plainTextToken?: string;
    accessToken?: AccessTokenTransformer;
    user?: AuthenticatedUserTransformer;
};

