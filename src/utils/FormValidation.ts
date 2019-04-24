export function validateEmail(email: string): string {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return '';
  }
  return 'email incorrect';
}
export function validatePassword(password: string): string {
  const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  const message = 'Votre mot de passe doit contenir';
  if (password.length < 6) return `${message} un minimum de 6 caractères`;
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return `${message} au moins une lettre minuscule et une lettre majuscule`;
  }
  if (!/(?=.*\d)/.test(password)) return `${message} au moins un chiffre!`;

  return '';
}
