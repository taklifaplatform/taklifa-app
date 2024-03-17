/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachmentTransformer } from './AttachmentTransformer';
import type { ChatUserTransformer } from './ChatUserTransformer';
import type { ReactionTransformer } from './ReactionTransformer';
import type { SimpleMessageTransformer } from './SimpleMessageTransformer';
export type MessageTransformer = {
    id?: number;
    cid?: string;
    parent_id?: string | null;
    type?: string;
    reply_count?: number;
    text?: string;
    html?: string;
    mentioned_users?: Array<ChatUserTransformer>;
    reaction_counts?: {
        like?: number;
        love?: number;
        haha?: number;
        wow?: number;
        sad?: number;
        angry?: number;
    };
    reaction_scores?: {
        like?: number;
        love?: number;
        haha?: number;
        wow?: number;
        sad?: number;
        angry?: number;
    };
    latest_reactions?: Array<ReactionTransformer>;
    own_reactions?: Array<ReactionTransformer>;
    user?: ChatUserTransformer;
    quoted_message?: SimpleMessageTransformer;
    thread_participants?: Array<ChatUserTransformer>;
    attachments?: Array<AttachmentTransformer>;
    created_at?: string;
    updated_at?: string;
};

