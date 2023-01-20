<template>
  <div class="login">
    <h1 class="title">{{ loginTitle }}</h1>
    <h4 class="description">{{ loginDescription }}</h4>
    <form action class="form" @submit.prevent="submitMethod">
      <label class="form-label" for="#email">Email:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#password">Password:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <div v-if="forgotPassword" class="forgot-password" align="right">
        <a @click="showForgotPassword">¿Olvidaste tu contraseña?</a>
      </div>
      <label v-if="passwordRepeatAct" class="form-label" for="#passwordRepeat"
        >Confirm Password:</label
      >
      <input
        v-if="passwordRepeatAct"
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="passwordRepeat"
        placeholder="Confirm Password"
      />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" :value="registerBtn" />
      <div class="account" align="center">
        {{ accountTxt }}<a href="#" @click="emitEvent">{{ accountBtn }}</a>
      </div>
    </form>
    <popup-form
      v-if="showForgotPasswordModal"
      @closePopup="closeForgotPassword"
    ></popup-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      error: false,
      showForgotPasswordModal: false,
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);
          this.$router.push("dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    register() {
      if (this.password !== this.passwordRepeat) {
        console.log("passwords does not match");
        return;
      }
      this.$axios
        .post("/api/register", {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordRepeat,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);
          this.$router.push("dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    emitEvent() {
      this.loginAct = !this.loginAct;
      this.$emit(this.loginAct ? "switch-login-act" : "switch-back-login-act");
    },
    showForgotPassword() {
      this.showForgotPasswordModal = true;
    },
    closeForgotPassword() {
      this.showForgotPasswordModal = false;
    },
  },
  props: {
    loginTitle: {
      default: "Registro",
    },
    loginDescription: {
      default: "Ingresa datos de tu nueva cuenta",
    },
    passwordRepeatAct: {
      default: false,
    },
    forgotPassword: {
      default: true,
    },
    registerBtn: {
      default: "Registrar",
    },
    accountTxt: {
      default: "¿Tienes una cuenta?",
    },
    accountBtn: {
      default: "Inicia sesión",
    },
    submitType: {
      default: "login",
    },
  },
  computed: {
    submitMethod() {
      return this[this.submitType];
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  padding: 15px;
  color: white;
  font-size: 14px !important;
}
.account a {
  padding: 15px;
  color: #0b9185;
  font-size: 14px !important;
}
.forgot-password a {
  padding: 5px;
  color: white;
  &:hover {
    outline: 0;
    color: #0b9185;
  }
}
.login {
  padding: 2rem;
}
.title {
  text-align: center;
  font-size: 32px !important;
  padding: 2rem;
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
