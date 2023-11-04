'use client'
import React, { PropsWithChildren } from 'react'
import {
  QueryClient, QueryClientProvider as ReactQuerClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQuerClientProvider client={queryClient}>
      {children}
    </ReactQuerClientProvider>
  )
}

export default QueryClientProvider