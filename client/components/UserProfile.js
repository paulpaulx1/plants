import React from 'react'
import {fetchUser} from '../store/user'
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

  componentDidMount = async () => {
    await this.props.fetchUser()
    this.setState({
      dataLoaded: true,
      user: this.props.user
    })
  }
  render() {
    if (this.state.dataLoaded === true) {
      return <div>{this.state.user.name}</div>
    } else {
      return <div>Loading</div>
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mapState, mapDispatch)(UserInfo)
