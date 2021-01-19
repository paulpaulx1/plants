import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div>
    <h1 className="toplogo">CRAZY VITO'S NOVELTY HAT EMPORIUM</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link id="navtext" to="/home">
            Home
          </Link>
          <Link id="navtext" to="/all">
            Novelty Hats
          </Link>
          <Link id="navtext" to={`/user/${userId}/shoppingcart`}>
            <i className="fa fa-shopping-cart" id="nav-cart" />
          </Link>
          <a id="navtext" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/all">Novelty Hats</Link>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/guest/shoppingcart">
            <i className="fa fa-shopping-cart" id="nav-cart" />
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
