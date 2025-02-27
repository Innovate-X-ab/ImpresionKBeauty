// src/lib/validations/payment.ts
import * as yup from 'yup';

export const creditCardSchema = yup.object({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  cardHolder: yup
    .string()
    .required('Card holder name is required')
    .min(3, 'Name must be at least 3 characters'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
});

// Function to format card number with spaces
export const formatCardNumber = (value: string) => {
  return value
    .replace(/\s/g, '')
    .match(/.{1,4}/g)
    ?.join(' ') || '';
};

// Function to format expiry date
export const formatExpiryDate = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};