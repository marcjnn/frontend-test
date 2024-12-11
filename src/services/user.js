import { postLoginEndpoint } from '../helpers/constants';
import axios from 'axios';

/**
 * Conecta con el API de autenticación
 * @param {Object} userData
 * @param {string} userData.username Nombre del usuario
 * @param {string} userData.password Contraseña del usuario
 * @returns {Object} Con el token en caso de exito o mensaje de error si algo ha fallado
 */
const login = async (userData) => {
  try {
    const res = await axios.post(postLoginEndpoint, userData, {
      auth: {
        username: userData.username,
        password: userData.password,
      },
    });

    if (res.status === 200) {
      return { token: res.data.token };
    }
  } catch (error) {
    const msg = error.response?.data || 'Looks like someone stepped on the cable, please try again!';
    return { error: msg };
  }
};

export { login };
