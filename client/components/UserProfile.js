import React from 'react'

export class UserInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false
    }
  }

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

// updateCreditCard = async () => {
// //
// }

// updateAddress = async () => {
//     //
// }

// updateEmail = async () => {}

// changePassword = async () => {}
