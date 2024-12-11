const validatorOptions = {
  required: /[a-z0-9]+/i,
  letters: /[a-z]/i,
  numbers: /\d/,
};

/**
 * Valida el valor de input según las condiciones especificadas
 * @param {string} fieldValue El valor para comprobar
 * @param {string[]} validators Las opciones de validación para aplicar, con tres possibilidades:
 *                              required - comprueba si el input no está vacío y si contiene minimo un carácter alfanumérico
 *                              letters - comprueba si contiene por lo menos una letra
 *                              numbers - comprueba si contiene por lo menos un digito
 * @returns {boolean} Si todas las condiciones han sido con exito
 */
export function validateInputField(fieldValue = '', validators = []) {
  const validated = validators.map(validator => validatorOptions[validator].test(fieldValue));

  return validated.every((item) => item === true);
}
