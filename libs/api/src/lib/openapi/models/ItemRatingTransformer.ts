/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RatingScoreTransformer } from './RatingScoreTransformer';
import type { UserTransformer } from './UserTransformer';
export type ItemRatingTransformer = {
    id?: number;
    comment?: string;
    score?: number;
    user?: UserTransformer;
    scores?: Array<RatingScoreTransformer>;
    created_at?: string;
};

