import USPS from '../node_modules/usps-webtools'

const usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: '503BYTEF2297',
  ttl: 10000 //TTL in milliseconds for request
});



export default USPS