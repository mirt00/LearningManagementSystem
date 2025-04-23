// backend.js
const crypto = require('crypto');

const generateSignature = (data, secretKey) => {
  const signedFields = data.signed_field_names.split(',');
  const stringToSign = signedFields.map(field => `${field}=${data[field]}`).join(',');
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(stringToSign);
  return hmac.digest('base64');
};

const formData = {
  total_amount: '100',
  transaction_uuid: 'TXN123456',
  product_code: 'EPAYTEST',
  signed_field_names: 'total_amount,transaction_uuid,product_code'
};

const secretKey = 'YOUR_SECRET_KEY';
const signature = generateSignature(formData, secretKey);

console.log(signature); // copy this into the HTML form
