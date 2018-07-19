const { post } = require('request-promise')

module.exports = async (efx, order, symbol, amount, price, gid, cid) => {
  if (!(order && symbol)) {
    throw new Error('order and symbol are required')
  }

  const meta = order

  const type = 'EXCHANGE LIMIT'

  const protocol = '0x'

  symbol = 't' + symbol

  const data = {
    gid,
    cid,
    type,
    symbol,
    amount,
    price,
    meta,
    protocol
  }

  const url = efx.config.api + '/submitOrder'

  return post(url, {json: data})
}
