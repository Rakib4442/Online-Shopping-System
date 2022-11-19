import { IDelivery } from '../../../types/delivery'

interface Erros extends Partial<IDelivery> {}

export const validateDelivery = (values: IDelivery) => {
  const errors: Erros = {}

 

  if (!values.email) {
    errors.email = 'Required'

  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
  }

  if(!values.phoneNumber) {
    errors.phoneNumber = 'Required'
  } else if (!/^[0-9]+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Number No Valid'
  } else if (values.phoneNumber.length !== 10) {
    errors.phoneNumber = '10 Digits Number Pls'
  }

  return errors
}