import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51I9W62HLAzF5yr08seh8CF44Fn7e7AR2Tq5oAvojPspQij7C6ET5rL9Z7cFHs87aHSVtf4NBqq3HdXaxja1lNYmv008pX9cYsU'
)

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
