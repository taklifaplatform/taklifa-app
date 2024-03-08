/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FromLocationUpdateShipmentRequest } from './FromLocationUpdateShipmentRequest';
import type { InvitationsUpdateShipmentRequest } from './InvitationsUpdateShipmentRequest';
import type { ItemsUpdateShipmentRequest } from './ItemsUpdateShipmentRequest';
import type { MaxBudgetUpdateShipmentRequest } from './MaxBudgetUpdateShipmentRequest';
import type { MinBudgetUpdateShipmentRequest } from './MinBudgetUpdateShipmentRequest';
import type { ToLocationUpdateShipmentRequest } from './ToLocationUpdateShipmentRequest';
export type UpdateShipmentRequest = {
    from_location?: FromLocationUpdateShipmentRequest;
    to_location?: ToLocationUpdateShipmentRequest;
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

