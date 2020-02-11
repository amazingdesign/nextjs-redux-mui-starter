import React, { useState } from 'react'

import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Typography } from '@material-ui/core'

import { getService } from '@bit/amazingdesign.redux-rest-services.get-service'
import { useService } from '@bit/amazingdesign.redux-rest-services.use-service'

const UseServicePage = (props) => {
  const { Loader, getState, find } = useService('randomusers')

  const [users, setUsers] = useState(getState('find.data'))
  const reloadUsers = () => find().then(() => setUsers(getState('find.data')))

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Loader>
          <List>
            {
              users && users.map((user) => (
                <ListItem key={user.login.uuid}>
                  <ListItemAvatar>
                    <Avatar
                      src={user.picture.thumbnail}
                      alt={`${user.name.first} ${user.name.last}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.name.first} ${user.name.last}`}
                    secondary={user.email}
                  />
                </ListItem>
              ))
            }
          </List>
        </Loader>
      </div>
      <Button
        color={'primary'}
        variant={'contained'}
        fullWidth={true}
        onClick={reloadUsers}
      >
        RELOAD
      </Button>
      <Typography>
        <br />
        This is content from{' '}
        <a
          href={'https://randomuser.me/api'}
          target={'_blank'}
          rel={'noreferrer noopener'}
        >
          https://randomuser.me/api
        </a>{' '}
        loaded by
        <a
          href={'https://github.com/amazingdesign/redux-rest-services'}
          target={'_blank'}
          rel={'noreferrer noopener'}
        >
          redux-rest-services
        </a>{' '}
        package using its{' '}
        <a
          href={'https://bit.dev/amazingdesign/redux-rest-services/use-service'}
          target={'_blank'}
          rel={'noreferrer noopener'}
        >
          useService
        </a>{' '}
        hook.
        <br />
        <br />
        <a href={'/use-service-loaded'}>Go to useServiceLoaded version!</a>
      </Typography>
    </>
  )
}

UseServicePage.getInitialProps = async ({ store }) => {
  const { find } = getService(store, 'randomusers')

  const result = await find()

  return { result }
}

export default UseServicePage