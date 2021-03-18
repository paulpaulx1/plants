import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
// import { getGuestShoppingCart } from '../store/guestShoppingCart'
// import { connect } from 'react-redux'
export default function Checkout() {
  const stripe = useStripe()
  const elements = useElements()
  console.log('checky')
  //    console.log(getGuestShoppingCart())
  const handleSubmit = async event => {
    // Block native form submission.
    event.preventDefault()

    // if (!stripe || !elements) {
    //   // Stripe.js has not loaded yet. Make sure to disable
    //   // form submission until Stripe.js has loaded.
    //   return
    // }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement)

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

// const mapState = state => {
//     return {
//         products: state.guestShoppingCartReducer.cart
//     }
// }

// const mapDispatch = dispatch => {
//     return {
//       loadGuestShoppingCart: () => {
//         dispatch(getGuestShoppingCart())
//       },
//     }
// }

// export default connect(mapState, mapDispatch)(Checkout)

// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder
