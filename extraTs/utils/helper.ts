/* eslint-disable import/prefer-default-export */
export function validateEmail(email: string) {
  const expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return expression.test(email);
}
