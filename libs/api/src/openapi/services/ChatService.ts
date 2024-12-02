/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChannelEventTransformer } from '../models/ChannelEventTransformer';
import type { ChannelTransformer } from '../models/ChannelTransformer';
import type { ChatUserTransformer } from '../models/ChatUserTransformer';
import type { ListChannelQueryRequest } from '../models/ListChannelQueryRequest';
import type { ListRepliesQueryRequest } from '../models/ListRepliesQueryRequest';
import type { MessageTransformer } from '../models/MessageTransformer';
import type { ModerateChannelRequest } from '../models/ModerateChannelRequest';
import type { MuteChannelRequest } from '../models/MuteChannelRequest';
import type { RetrieveChannelQueryRequest } from '../models/RetrieveChannelQueryRequest';
import type { SendChannelEventRequest } from '../models/SendChannelEventRequest';
import type { SimpleChannelTransformer } from '../models/SimpleChannelTransformer';
import type { UpdateMessageRequest } from '../models/UpdateMessageRequest';
import type { UpdateReactionRequest } from '../models/UpdateReactionRequest';
import type { UploadAttachmentRequest } from '../models/UploadAttachmentRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * Chat App Configuration.
     * @throws ApiError
     */
    public static chatApp(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/app',
        });
    }
    /**
     * Display a listing of the resource.
     * @returns any Successful response
     * @throws ApiError
     */
    public static channels({
        requestBody,
    }: {
        requestBody: ListChannelQueryRequest,
    }): CancelablePromise<{
        data?: Array<ChannelTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * start chat.
     * @returns any Successful response
     * @throws ApiError
     */
    public static startChat({
        user,
    }: {
        user: string,
    }): CancelablePromise<{
        data?: SimpleChannelTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels/start-chat/{user}',
            path: {
                'user': user,
            },
        });
    }
    /**
     * Channel messages.
     * @returns any Successful response
     * @throws ApiError
     */
    public static channelMessages({
        channel,
        requestBody,
    }: {
        channel: string,
        requestBody: RetrieveChannelQueryRequest,
    }): CancelablePromise<{
        data?: ChannelTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels/messaging/{channel}/query',
            path: {
                'channel': channel,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create a new message in the chat channel.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createMessage({
        channel,
        requestBody,
    }: {
        channel: string,
        requestBody: UpdateMessageRequest,
    }): CancelablePromise<{
        data?: MessageTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels/messaging/{channel}/message',
            path: {
                'channel': channel,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a message in the chat channel.
     * @returns any Successful response
     * @throws ApiError
     */
    public static updateMessage({
        requestBody,
    }: {
        requestBody: UpdateMessageRequest,
    }): CancelablePromise<{
        data?: MessageTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/chat/messages/{messageId}',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a message in the chat channel.
     * @returns any Successful response
     * @throws ApiError
     */
    public static deleteMessage(): CancelablePromise<{
        data?: MessageTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/chat/messages/{messageId}',
        });
    }
    /**
     * Create a reaction for a message.
     * @returns any Successful response
     * @throws ApiError
     */
    public static createReaction({
        requestBody,
    }: {
        requestBody: UpdateReactionRequest,
    }): CancelablePromise<{
        data?: MessageTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/messages/{messageId}/reaction',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Display List of Replies for the chat message.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listReplies({
        requestBody,
    }: {
        requestBody: ListRepliesQueryRequest,
    }): CancelablePromise<{
        data?: Array<MessageTransformer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/messages/{messageId}/replies',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Upload an image to the chat channel.
     * @throws ApiError
     */
    public static uploadImage({
        channel,
        requestBody,
    }: {
        channel: string,
        requestBody: UploadAttachmentRequest,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels/messaging/{channel}/image',
            path: {
                'channel': channel,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Successful response
     * @throws ApiError
     */
    public static moderateChannel({
        channel,
        requestBody,
    }: {
        channel: string,
        requestBody: ModerateChannelRequest,
    }): CancelablePromise<{
        data?: ChannelTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels/messaging/{channel}',
            path: {
                'channel': channel,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mute a channel.
     * @returns any Successful response
     * @throws ApiError
     */
    public static muteChannel({
        requestBody,
    }: {
        requestBody: MuteChannelRequest,
    }): CancelablePromise<{
        data?: ChannelTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/moderation/mute/channel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unmute a channel.
     * @returns any Successful response
     * @throws ApiError
     */
    public static unmuteChannel({
        requestBody,
    }: {
        requestBody: MuteChannelRequest,
    }): CancelablePromise<{
        data?: ChannelTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/moderation/unmute/channel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Display List of Users for the chat.
     * @returns any Successful response
     * @throws ApiError
     */
    public static listUsers(): CancelablePromise<{
        data?: Array<ChatUserTransformer>;
        links?: {
            first?: string;
            last?: string;
            prev?: string;
            next?: string;
        };
        meta?: {
            current_page?: number;
            from?: number;
            last_page?: number;
            links?: Array<{
                url?: string;
                label?: string;
                active?: boolean;
            }>;
            path?: string;
            per_page?: number;
            to?: number;
            total?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/chat/users',
        });
    }
    /**
     * Send an event to the chat channel.
     * @returns any Successful response
     * @throws ApiError
     */
    public static sendEvent({
        channel,
        requestBody,
    }: {
        channel: string,
        requestBody: SendChannelEventRequest,
    }): CancelablePromise<{
        data?: ChannelEventTransformer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/chat/channels/messaging/{channel}/event',
            path: {
                'channel': channel,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
