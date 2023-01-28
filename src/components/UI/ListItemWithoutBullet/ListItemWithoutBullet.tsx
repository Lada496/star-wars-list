import React from 'react'
import { ListItem } from '@chakra-ui/react'

type ListItemWithoutBulletProps = {
  children: React.ReactNode
}

const ListItemWithoutBullet = ({ children }: ListItemWithoutBulletProps) => {
  return <ListItem listStyleType='none'>{children}</ListItem>
}

export default ListItemWithoutBullet
