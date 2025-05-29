/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagesUpdateAnnouncementRequest } from './ImagesUpdateAnnouncementRequest';
export type UpdateAnnouncementRequest = {
    title?: string;
    description?: string;
    price?: string;
    category_id?: string;
    sub_category_id?: string;
    metadata?: Array<string>;
    city?: string;
    images?: Array<ImagesUpdateAnnouncementRequest>;
};

