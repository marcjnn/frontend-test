<!-- eslint-disable eqeqeq -->
<template>
  <!-- Ajusto la semantica de html -->
  <section class="product-list">
    <h1>Product List</h1>
    <p v-if="loading" class="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="!loading && !error" class="products">
      <li v-for="product in products" :key="product.id">
        <product-card
          :product="product"
          @product-favorite-clicked="toggleProductFavorite(product.id)"
        />
      </li>
    </ul>
  </section>
</template>

<script>
/* Elimino los imports relacionados a la llamada API ya que la haremos desde servicios */
import { getProducts } from '@/services/product';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'ProductsList',
  components: {
    ProductCard,
  },
  /* Elimino la llamada duplicada; en Vue el hook para las llamadas API, si no es necesario interactuar con el DOM, se hace desde created */
  created() {
    this.fetchProducts();
  },
  data() {
    return {
      products: [],
      /* Añado una propiedad para guardar la cantidad de los productos que nos interesa recibir. De esta manera evitamos el uso de los magic numbers
       y a la vez tenemos la posibilidad para modificarla según necesidades */
      productCount: 5,
      loading: true,
      error: null,
    };
  },
  methods: {
    async fetchProducts() {
      /* Muevo la llamada al API a la carpeta de servicios */
      const result = await getProducts(this.productCount);
      this.products = result.map((product) => {
        product.favorite = false;
        return product;
      });

      if (!this.products.length) {
        this.error = 'Failed to load products';
      }

      this.loading = false;
    },
    /**
     * Añade o elimina la marca del producto favorito
     * @param productSelectedId El id de producto en que se ha hecho click
     */
    toggleProductFavorite(productSelectedId) {
      /* En este metodo tuvimos varios problemas:
      - se pasaba los productos como argumento que no es necesario dado que los tenemos guardados en una propiedad reactiva
      - al array de output se añadía una función en lugar de datos del producto (en el .push())
      - el uso de 'var' en lugar de 'const' o 'let' que cambia el scope de las variables y no es cohesivo con el resto del proyecto
      - no era necesario recorrer todo el array de productos con cada click, es más ergonómico trabajar solamente con el seleccionado
      */
      const selectedProduct = this.products.find(
        (product) => product.id === productSelectedId
      );
      selectedProduct.favorite = !selectedProduct.favorite;
    },
  },
};
</script>

<style scoped>
.product-list {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  margin: 0;
  font-size: 18px;
  color: var(--bs-gray-700);
}

.error {
  margin: 0;
  color: var(--bs-danger);
  font-size: 18px;
}

/* Pequeño ajuste para el grid para versiones mobile/desktop ya que los productos en mobile se pintaban muy desmontados */
.products {
  display: grid;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

@media (min-width: 992px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
