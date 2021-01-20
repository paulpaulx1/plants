import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'
import {Link} from 'react-router-dom'

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
    console.log('PROPS------->', this.props)
    if (this.state.dataLoaded === true) {
      const {users} = this.props
      return (
        <header className="flex-container">
          <span>
            {' '}
            <h1 className="all-h1">All Users</h1>
            <div>
              {users.map(user => (
                <div key={user.id}>
                  <h4>Email: {user.email}</h4>
                  <h4>isAdmin: {user.isAdmin ? 'true' : 'false'}</h4>
                </div>
              ))}
            </div>
          </span>
        </header>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}
const mapState = state => {
  console.log('STATE------>', state)
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
