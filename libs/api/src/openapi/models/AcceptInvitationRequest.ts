/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CostAcceptInvitationRequest } from './CostAcceptInvitationRequest';
import type { FeeAcceptInvitationRequest } from './FeeAcceptInvitationRequest';
export type AcceptInvitationRequest = {
    ship_date?: string;
    ship_time?: string;
    cost?: CostAcceptInvitationRequest;
    fee?: FeeAcceptInvitationRequest;
    message?: string;
};

