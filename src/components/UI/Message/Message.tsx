import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

export const MESSAGE_STATUS = {
  ERROR: 'error',
  WARNING: 'warning',
} as const

type MessageStatus = typeof MESSAGE_STATUS[keyof typeof MESSAGE_STATUS]

type ErrorMessageProps = {
  status: MessageStatus
  title?: string
  message?: string
}

const Message = ({
  status,
  title = 'Error',
  message = 'Oops! Something went wrong. Please try it later!',
}: ErrorMessageProps) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

export default Message
