<template>
  <!-- Ajusto la semantica de html -->
  <article class="product-item">
    <!--
    Tenemos varios problemas por aquí
    - el icono no es clickable, por lo que no se emite el evento 'product-favorite-clicked'
    - para respetar el html semántico usaré button en lugar de span
    - es necesario añadir la clase 'selected' cuándo el producto tiene la marca de favorito
    - cambio palabra 'icono' por 'icon' para seguir la nomenclatura en ingles, cómo en todo el proyecto
    -->
    <button
      type="button"
      class="btn-favorite"
      @click="onFavoriteClicked"
      aria-label="Add to favorites"
    >
      <span
        class="icon favorite"
        :class="{ selected: product.favorite }"
      ></span>
    </button>
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h3 class="product-title">{{ product.title }}</h3>
    <p class="product-description">{{ product.description }}</p>
    <p><span class="price-text">Price:</span> ${{ product.price }}</p>
  </article>
</template>

<script>
import { productFavoriteClickedEventName } from '@/helpers/constants';
export default {
  name: 'ProductCard',
  props: ['product'],
  /* Elimino el campo 'data' ya que estaba vacío */
  methods: {
    onFavoriteClicked() {
      /* Uso la variable para el nombre del evento emitido para que se emita correctamente */
      this.$emit(productFavoriteClickedEventName, this.product.id);
    },
  },
};
</script>

<style scoped>
.product-item {
  position: relative;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
  --btn-size: 30px;
}

.product-image {
  width: 150px;
  height: 150px;
  object-fit: scale-down;
  margin-bottom: 10px;
}

.product-title {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 2em;
  line-height: 1.8em;
}

.product-description {
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  height: 3.6em;
  line-height: 1.8em;
}

.price-text {
  font-weight: 700;
}

/* Al usar el button alrededor del icono es necesario ajustar los estilos */
.btn-favorite {
  position: absolute;
  top: 20px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--btn-size);
  height: var(--btn-size);
  border: none;
  background-color: transparent;
}

span.icon.favorite.selected::before {
  background-image: url("../assets/favorite-filled-red.svg");
}

span.icon.favorite::before {
  background-image: url("../assets/favorite-filled-muted.svg");
}

.favorite:hover {
  filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
}

/* Elimino selectores de clase .favorite-icon ya que no se usa en ningún sitio */

/* Elimino el display del span.icon, al estar dentro del contenedor flex ya no es necesario */

span.icon::before {
  content: "";
  width: 2.4rem;
  height: 2.4rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  vertical-align: text-bottom;
}
</style>
