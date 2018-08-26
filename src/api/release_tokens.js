const { post } = require('request-promise')
const parse = require('../lib/parse/response/release_tokens')

module.exports = async (efx, coin, nonce, signature) => {
  const url = efx.config.api + '/w/releaseTokens'

  const currency = efx.CURRENCIES[coin]

  if (!nonce) {
    nonce = ((Date.now() / 1000) + 30) + ''

    signature = await efx.sign(nonce.toString(16))
  }

  const protocol = '0x'

  const data = {
    nonce,
    signature,
    tokenAddress: currency.lockerAddress,
    protocol
  }

  return parse(post(url, {json: data}))
}
