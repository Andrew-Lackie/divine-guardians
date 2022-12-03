const token = localStorage.getItem('token');
const STARTER_PRICE_ID = 'price_1M9KQzJz6WxcJtmMo1uDvC7G';
const PRO_PRICE_ID = 'price_1M9KRmJz6WxcJtmMZppVMHT2';
const PREMIUM_PRICE_ID = 'price_1M9KSYJz6WxcJtmMEzlFlcZz';
const stripe = Stripe(
  'pk_test_51M8rBVJz6WxcJtmMWDIY4ueKBTA4jV82b448ML5IYn3jRVXHGDsk8yFWu8YYcsuAfWtODsUKm44YDjQ07LFypeQk00GFC5GF3y'
);
var membership;

var createCheckoutSession = function (priceId, data, membership) {
  return fetch('http://127.0.0.1:8000/create_checkout_session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
      userId: data.user_id,
      membership: membership,
    }),
  }).then(function (result) {
    console.log(result);
    return result.json();
  });
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const user = parseJwt(token);

document.addEventListener('DOMContentLoaded', function (event) {
  document
    .querySelector('.starter-membership')
    .addEventListener('click', function (evt) {
      membership = 'starter';
      createCheckoutSession(STARTER_PRICE_ID, user, membership).then(function (
        data
      ) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    });
  document
    .querySelector('.pro-membership')
    .addEventListener('click', function (evt) {
      membership = 'pro';
      createCheckoutSession(PRO_PRICE_ID, user, membership).then(function (
        data
      ) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    });
  document
    .querySelector('.premium-membership')
    .addEventListener('click', function (evt) {
      membership = 'premium';
      createCheckoutSession(PREMIUM_PRICE_ID, user, membership).then(function (
        data
      ) {
        stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
      });
    });
});
