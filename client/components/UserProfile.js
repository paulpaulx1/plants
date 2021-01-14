import React from 'react'
import {fetchUser} from '../store/userprofile'
import {connect} from 'react-redux'

export class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false
    }
  }

  // updateCreditCard = async () => {
  // //
  // }

  // updateAddress = async () => {
  //     //
  // }

  // updateEmail = async () => {}

  // changePassword = async () => {}

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
    this.setState({
      dataLoaded: true
    })
  }
  render() {
    const user = this.props.user
    if (this.state.dataLoaded === true) {
      return <div>{user.name}</div>
    } else {
      return <div>Loading</div>
    }
  }
}

const mapState = state => {
  return {
    user: state.userProfile.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mapState, mapDispatch)(UserInfo)
