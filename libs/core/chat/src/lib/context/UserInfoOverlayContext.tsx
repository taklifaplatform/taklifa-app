import React, { useContext, useState } from 'react'

import type { ChannelState } from 'stream-chat'
import type { ChannelContextValue } from 'stream-chat-expo'

import type { StreamChatGenerics } from '../types'

export type UserInfoOverlayData = Partial<
  Pick<ChannelContextValue<StreamChatGenerics>, 'channel'>
> & {
  member?: ChannelState<StreamChatGenerics>['members'][0]
}

export type UserInfoOverlayContextValue = {
  reset: () => void
  setData: React.Dispatch<React.SetStateAction<UserInfoOverlayData>>
  data?: UserInfoOverlayData
}

export const UserInfoOverlayContext = React.createContext({} as UserInfoOverlayContextValue)

export const UserInfoOverlayProvider: React.FC<{
  value?: UserInfoOverlayContextValue
}> = ({ children, value }) => {
  const [data, setData] = useState(value?.data)

  const reset = () => {
    setData(value?.data)
  }

  const userInfoOverlayContext = {
    data,
    reset,
    setData,
  }
  return (
    <UserInfoOverlayContext.Provider value={userInfoOverlayContext as UserInfoOverlayContextValue}>
      {children}
    </UserInfoOverlayContext.Provider>
  )
}

export const useUserInfoOverlayContext = () =>
  useContext(UserInfoOverlayContext) as unknown as UserInfoOverlayContextValue
