/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FilterConditionsListChannelQueryRequest } from './FilterConditionsListChannelQueryRequest';
import type { SortListChannelQueryRequest } from './SortListChannelQueryRequest';
export type ListChannelQueryRequest = {
    filter_conditions?: FilterConditionsListChannelQueryRequest;
    sort?: Array<SortListChannelQueryRequest>;
    state?: boolean;
    watch?: boolean;
    presence?: boolean;
    limit?: number;
    offset?: number;
    user_id?: string;
    api_key?: string;
};

