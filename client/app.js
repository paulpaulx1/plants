import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG')

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <Navbar />
        <Routes />
      </Elements>
    </div>
  )
}

export default App
