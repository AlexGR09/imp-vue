<template>
  <div class="card">
    <div class="card-header">
      <button class="close-button" @click="closePopup">X</button>
    </div>
    <div class="popup">
      <h1 class="title">Recuperación</h1>
      <h4 class="description">Ingrese su correo</h4>
      <form action class="form" @submit.prevent="restore">
        <label class="form-label" for="restorePassword">Email:</label>
        <input
          class="form-input"
          type="text"
          id="restorePassword"
          v-model="textInput"
          required
        />
        <div class="message" v-if="showEmailSent">
          <p>Se ha enviado un correo de recuperación</p>
        </div>
        <input class="form-submit" type="submit" value="Recuperar contraseña" />
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      textInput: "",
      showPopup: true,
      showEmailSent: false,
    };
  },
  methods: {
    restore() {
      this.showEmailSent = true;
    },
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>
  
<style lang="scss" scoped>
.message p {
  padding: 5px;
  color: #34e4a9;
  font-size: 14px !important;
}
.card {
  position: fixed;
  border: 1px solid white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #272727;
  z-index: 999;
}

.card-header {
  display: flex;
  justify-content: flex-end;
}

.close-button {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.popup {
  padding: 2rem;
}
.title {
  text-align: center;
  font-size: 32px !important;
}
.description {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: #272727;
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}
</style>
  