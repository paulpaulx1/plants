import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import AdminDashboard from './components/AdminDashboard'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import UserProfile from './components/UserProfile'
import GuestShoppingCart from './components/GuestShoppingCart'
import OrderConfirmation from './components/OrderConfirmation'
import AllUsers from './components/AllUsers'
import UserShoppingCart from './components/UserShoppingCart'
import OrderHistory from './components/OrderHistory'
import Checkout from './components/Checkout'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/all" component={AllProducts} />
        <Route exact path="/product/:id" component={SingleProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/guest/shoppingcart" component={GuestShoppingCart} />
        <Route exact path="/orderconfirmation" component={OrderConfirmation} />
        <Route exact path="/createcheckoutsession" component={Checkout} />
        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/all" component={AllProducts} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route exact path="/user/:id" component={UserProfile} />
            <Route
              exact
              path="/user/:id/orderhistory"
              component={OrderHistory}
            />
            <Route
              exact
              path="/user/:id/shoppingcart"
              component={UserShoppingCart}
            />
            <Route
              exact
              path="/orderconfirmation"
              component={OrderConfirmation}
            />
            <Route exact path="/createcheckoutsession" component={Checkout} />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/all" component={AllProducts} />
            <Route exact path="/product/:id" component={SingleProduct} />
            <Route exact path="/user/:id" component={UserProfile} />
            <Route
              exact
              path="/user/:id/orderhistory"
              component={OrderHistory}
            />
            <Route
              exact
              path="/user/:id/shoppingcart"
              component={UserShoppingCart}
            />
            <Route
              exact
              path="/orderconfirmation"
              component={OrderConfirmation}
            />
            <Route exact path="/createcheckoutsession" component={Checkout} />
            {/* <Route exact path="/users" component={AllUsers} /> */}
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey

    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
