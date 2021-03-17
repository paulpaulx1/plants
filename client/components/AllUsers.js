import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false
    }
  }
  componentDidMount() {
    if (this.props.match) {
      this.props.fetchUsers()
      this.setState({dataLoaded: true})
    }
  }

  render() {
    if (this.state.dataLoaded === true) {
      const {users} = this.props
      return (
        <Paper>
          <header>
            <span>
              {' '}
              <Paper>
                {' '}
                <h1>All Users</h1>
              </Paper>
              <div>
                {users.map(user => (
                  <Paper key={user.id}>
                    {' '}
                    <div>
                      <Paper>
                        {' '}
                        <h4>Email: {user.email}</h4>
                      </Paper>
                      <Paper>
                        <h4>isAdmin: {user.isAdmin ? 'true' : 'false'}</h4>
                      </Paper>
                    </div>
                  </Paper>
                ))}
              </div>
            </span>
          </header>
        </Paper>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}
const mapState = state => {
  return {users: state.allUsers.user}
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
