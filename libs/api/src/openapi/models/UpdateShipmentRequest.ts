/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InvitationsUpdateShipmentRequest } from './InvitationsUpdateShipmentRequest';
import type { ItemsUpdateShipmentRequest } from './ItemsUpdateShipmentRequest';
import type { MaxBudgetUpdateShipmentRequest } from './MaxBudgetUpdateShipmentRequest';
import type { MinBudgetUpdateShipmentRequest } from './MinBudgetUpdateShipmentRequest';
export type UpdateShipmentRequest = {
    from_location_id?: string;
    to_location_id?: string;
    selected_driver_id?: string;
    selected_company_id?: string;
    pick_date?: string;
    pick_time?: string;
    deliver_date?: string;
    deliver_time?: string;
    recipient_name?: string;
    recipient_phone?: string;
    items_type?: string;
    min_budget?: MinBudgetUpdateShipmentRequest;
    max_budget?: MaxBudgetUpdateShipmentRequest;
    items?: Array<ItemsUpdateShipmentRequest>;
    invitations?: Array<InvitationsUpdateShipmentRequest>;
};

