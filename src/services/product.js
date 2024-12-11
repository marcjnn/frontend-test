import axios from 'axios';
import { getProductsListEndpoint } from '@/helpers/constants';

/**
 * Devuelve la lista de productos
 * @param {[number]} productCount Indica cuantos productos queremos pedir. Si no se especifica, se devuelve todos los disponibles
 * @returns {Array}
 */
const getProducts = async (productCount = null) => {
  const url = productCount
    ? `${getProductsListEndpoint}?limit=${productCount}`
    : getProductsListEndpoint;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return [];
  }
};

export { getProducts };
