import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Paper from '@material-ui/core/Paper'

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => (
  <Paper>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
      }}
    >
      <Paper
        style={{
          paddingLeft: '2em',
          paddingRight: '2em',
          margin: 10,
          marginRight: 'auto',
          marginLeft: '20px'
        }}
      >
        <h1 style={{fontSize: 40, marginRight: 'auto', color: 'green'}}>
          plants +{' '}
        </h1>{' '}
      </Paper>
      <nav style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        {isLoggedIn ? (
          <div
            className="navbarbuttonwrapper"
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap'
            }}
          >
            {/* The navbar will show these links after you log in */}
            <Paper className="navbarlinks">
              <Link id="navtext" to="/home">
                my account
              </Link>
            </Paper>
            {isAdmin ? (
              <Paper className="navbarlinks">
                <Link to="/admin"> admin</Link>
              </Paper>
            ) : (
              <span />
            )}
            {isAdmin ? (
              <Paper className="navbarlinks">
                <Link to="/users"> all users</Link>
              </Paper>
            ) : (
              <span />
            )}

            <Paper className="navbarlinks">
              <Link to="/all">the plants</Link>
            </Paper>
            <Paper className="navbarlinks">
              <Link to={`/user/${userId}/orderhistory`}>order history</Link>
            </Paper>
            <Paper className="navbarlinks">
              <Link to={`/user/${userId}/shoppingcart`}>
                <i className="fa fa-shopping-cart" id="nav-cart" />
              </Link>
            </Paper>
            <Paper className="navbarlinks">
              {' '}
              <a href="#" onClick={handleClick}>
                logout
              </a>
            </Paper>
          </div>
        ) : (
          <div
            className="navbarbuttonwrapper"
            style={{display: 'flex', justifyContent: 'space-evenly'}}
          >
            {/* The navbar will show these links before you log in */}
            <Paper className="navbarlinks">
              <Link to="/all">the plants</Link>
            </Paper>
            <Paper className="navbarlinks">
              <Link to="/login">log in</Link>
            </Paper>
            <Paper className="navbarlinks">
              <Link to="/signup">sign up</Link>
            </Paper>{' '}
            <Link to="/guest/shoppingcart">
              <Paper className="navbarlinks">
                <i className="fa fa-shopping-cart" id="nav-cart" />
              </Paper>{' '}
            </Link>
          </div>
        )}
      </nav>
    </div>
  </Paper>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.isAdmin
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
