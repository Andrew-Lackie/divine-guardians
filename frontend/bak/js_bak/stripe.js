var createCheckoutSession = function (priceId) {
  return fetch('http://127.0.0.1:8000/create_checkout_session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
    }),
  }).then(function (result) {
    return result.json();
  });
};

const STARTER_PRICE_ID = 'price_1M9KQzJz6WxcJtmMo1uDvC7G';
const PRO_PRICE_ID = 'price_1M9KRmJz6WxcJtmMZppVMHT2';
const PREMIUM_PRICE_ID = 'price_1M9KSYJz6WxcJtmMEzlFlcZz';
const stripe = Stripe(
  'pk_test_51M8rBVJz6WxcJtmMWDIY4ueKBTA4jV82b448ML5IYn3jRVXHGDsk8yFWu8YYcsuAfWtODsUKm44YDjQ07LFypeQk00GFC5GF3y'
);

document.addEventListener('DOMContentLoaded', function (event) {
  document
    .querySelector('.starter-membership')
    .addEventListener('click', function (evt) {
      createCheckoutSession(STARTER_PRICE_ID).then(function (data) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    });
  document
    .querySelector('.pro-membership')
    .addEventListener('click', function (evt) {
      createCheckoutSession(PRO_PRICE_ID).then(function (data) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    });
  document
    .querySelector('.premium-membership')
    .addEventListener('click', function (evt) {
      createCheckoutSession(PREMIUM_PRICE_ID).then(function (data) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    });
});
