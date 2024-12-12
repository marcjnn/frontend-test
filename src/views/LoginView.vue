<template>
  <form class="form-signin" @submit.prevent="onSignIn">
    <img
      class="mb-4"
      src="../assets/logo.png"
      alt=""
      width="100"
      height="100"
    />
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="username" class="form-label col-form-label">Username:</label>
    <input
      v-model="username"
      name="username"
      type="text"
      id="username"
      class="form-control mb-2"
      placeholder="eg. mor_2314"
      aria-required="true"
    />
    <label for="inputPassword" class="form-label col-form-label"
      >Password:</label
    >
    <input
      v-model="password"
      name="password"
      type="password"
      id="inputPassword"
      class="form-control mb-4"
      placeholder="eg. 83r5^_"
      aria-required="true"
    />
    <div class="button-container">
      <button
        class="btn btn-lg btn-secondary btn-block"
        type="button"
        @click="resetForm"
      >
        Reset fields
      </button>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        <span>Sign in</span>
        <!-- Loader -->
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm mx-2"
          role="status"
          aria-hidden="false"
        ></span>
      </button>
    </div>
    <ul v-if="errors.length" class="error-list">
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </form>
</template>

<script>
import { tokenStorageName } from '@/helpers/constants';
import { validateInputField } from '@/helpers/validator';
import { login } from '@/services/user';
export default {
  /* Me he permitido cambiar el nombre del componente a uno que consiste de 2 palabras, siendo una de las prácticas de creación de los componentes */
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      isLoading: false,
      errors: [],
    };
  },
  methods: {
    /**
     * Valida los campos del formulario, conecta con el API de autenticación en caso correcto
     * y actualiza el estado dependiendo si ha sido exitosa o no
     */
    async onSignIn() {
      this.resetErrors();

      const isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      this.isLoading = true;
      // AUTHENTICATION
      const result = await login({
        username: this.username,
        password: this.password,
      });

      const { error, token } = result;

      if (token) {
        localStorage.setItem(tokenStorageName, token);
        this.$router.push({ name: 'home' });
      }

      if (error) {
        this.errors.push(error);
      }

      this.isLoading = false;
    },
    /**
     * Resetea la lista de errores
     */
    resetErrors() {
      this.errors.length = 0;
    },
    /**
     * Resetea los campos de formulario y la lista de errores
     */
    resetForm() {
      this.username = '';
      this.password = '';
      this.resetErrors();
    },
    /**
     * Valida los campos de formulario según las condiciones:
     * - nombre del usuario - no puede estar vacío y tiene que contener por lo menos un carácter alfanumérico
     * - contraseña - no puede estar vacía y tiene que contener por lo menos una letra y un digito
     */
    validateForm() {
      // username
      const usernameIsValid = validateInputField(this.username, ['required']);
      if (!usernameIsValid) {
        this.errors.push('Username is required');
      }

      // password
      const passwordNotEmpty = validateInputField(this.password, ['required']);
      if (!passwordNotEmpty) {
        this.errors.push('Password is required');
      }

      const passwordHasLetters = validateInputField(this.password, [
        'letters',
        'numbers',
      ]);
      if (!passwordHasLetters) {
        this.errors.push(
          'Password must contain at least one letter in and one number'
        );
      }

      const passwordIsValid = passwordNotEmpty && passwordHasLetters;

      return usernameIsValid && passwordIsValid;
    },
  },
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  margin: 0 auto;
  padding: 15px;
}

.form-label {
  width: 100%;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.error-list {
  margin: 12px 0;
  padding: 0;
  color: var(--bs-danger);
  list-style-type: none;
}
</style>
