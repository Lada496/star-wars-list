import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import { Flex, Link, Box } from '@chakra-ui/react'

type TabListProps = {
  tabKeys: string[]
}

const TabList = ({ tabKeys }: TabListProps) => {
  return (
    <Flex direction='column' overflowY='scroll' height='90vh'>
      {tabKeys.map((tabKey) => (
        <Link
          as={RouterLink}
          key={tabKey}
          to={tabKey}
          textTransform='capitalize'
          textAlign='center'
          _activeLink={{ color: 'white', backgroundColor: 'black.900' }}
        >
          <Box m={2}>{tabKey}</Box>
        </Link>
      ))}
    </Flex>
  )
}

export default TabList
