<template>
  <div>
    <login-card
      @switch-login-act="handleSwitchLoginAct"
      @switch-back-login-act="handleSwitchLoginAct"
      :loginTitle="loginAct ? loginTitle : undefined"
      :loginDescription="loginAct ? loginDescription : undefined"
      :registerBtn="loginAct ? registerBtn : undefined"
      :passwordRepeatAct="loginAct ? undefined : passwordRepeatAct"
      :forgotPassword="loginAct ? undefined : forgotPassword"
      :accountTxt="loginAct ? accountTxt : undefined"
      :accountBtn="loginAct ? accountBtn : undefined"
      :submitType="loginAct ? undefined : submitType"
    ></login-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginTitle: "Inicio de sesión",
      loginDescription: "Ingrese sus credenciales",
      registerBtn: "Iniciar sesión",
      passwordRepeatAct: true,
      forgotPassword: false,
      accountTxt: "¿No tienes una cuenta?",
      accountBtn: "Regístrate",
      submitType: "register",
      loginAct: true,
    };
  },
  methods: {
    handleSwitchLoginAct() {
      this.loginAct = !this.loginAct;
    },
  },
};
</script>
