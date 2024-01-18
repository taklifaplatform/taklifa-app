export const CHAT_MESSAGE_WITH_RELATIONS_QUERY = `
  *,
  user:users(*),
  latest_reactions:reactions(*, user:users(*)),
  quoted_message: quoted_message_id(*, user:users(*)),
  reply_count:messages!parent_id(count)
`;
export const CHAT_CHANNELS_QUERY_SELECTOR = `
  *,
  messages(${CHAT_MESSAGE_WITH_RELATIONS_QUERY}),
  members:channel_members(
    *,
    user:users!user_id(*)
  ),
  members_count:channel_members!channel_id(count)
`;
