/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MainProductCategoryTransformer = {
    id?: string;
    name?: string;
    description?: string | null;
    order?: number;
    parent_id?: string | null;
    sub_categories?: Array<{
        id?: string;
        name?: string;
        description?: string | null;
        order?: number;
        parent_id?: string;
    }> | null;
};

