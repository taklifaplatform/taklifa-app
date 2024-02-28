/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentInvitationsUpdateShipmentRequest } from './ShipmentInvitationsUpdateShipmentRequest';
import type { ShipmentItemsUpdateShipmentRequest } from './ShipmentItemsUpdateShipmentRequest';
export type UpdateShipmentRequest = {
    pick_date?: string;
    pick_time?: string;
    deliver_date?: string;
    deliver_time?: string;
    recipient_name?: string;
    recipient_phone?: string;
    items_type?: string;
    status?: string;
    min_budget_id?: string;
    max_budget_id?: string;
    shipmentItems?: ShipmentItemsUpdateShipmentRequest;
    shipmentInvitations?: ShipmentInvitationsUpdateShipmentRequest;
};

