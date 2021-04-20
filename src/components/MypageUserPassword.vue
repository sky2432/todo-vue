<template>
  <div id="app">
    <div class="mypage-content">
      <div>
        <b-form @submit.prevent="updatePassword" novalidate>
          <b-form-group
            label="現在のパスワード"
            label-for="currentPassword"
            class="label"
          >
            <b-form-input
              id="currentPassword"
              type="password"
              v-model="currentPassword"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsCurrentPassword">
              <p
                v-for="(error, index) in this.errorsCurrentPassword"
                :key="index"
              >
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <b-form-group
            label="新しいパスワード"
            label-for="newPassword"
            class="label"
          >
            <b-form-input
              id="newPassword"
              type="password"
              v-model="newPassword"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsNewPassword">
              <p v-for="(error, index) in this.errorsNewPassword" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <b-form-group
            label="新しいパスワードの確認"
            label-for="newPasswordConfirm"
            class="label"
          >
            <b-form-input
              id="newPasswordConfirm"
              type="password"
              v-model="newPasswordConfirm"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsNewPasswordConfirm">
              <p
                v-for="(error, index) in this.errorsNewPasswordConfirm"
                :key="index"
              >
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <div class="btn-wrap">
            <b-button variant="outline-info" type="submit">変更</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import usersRepository from "../repositories/usersRepository";
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
      errorsCurrentPassword: [],
      errorsNewPassword: [],
      errorsNewPasswordConfirm: [],
    };
  },

  computed: {
    ...mapState(["loginUser"]),
  },

  methods: {
    updatePassword() {
      const sendData = {
        id: this.loginUser.id,
        current_password: this.currentPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirm,
      };
      usersRepository
        .updatePassword(sendData)
        .then((response) => {
          this.resetData();
          this.showMsgBox();
        })
        .catch((e) => {
          this.errorsCurrentPassword = e.response.data.errors.current_password;
          this.errorsNewPassword = e.response.data.errors.new_password;
          this.errorsNewPasswordConfirm =
            e.response.data.errors.new_password_confirmation;
        });
    },

    resetData() {
      this.errorsCurrentPassword = "";
      this.errorsNewPassword = "";
      this.errorsNewPasswordConfirm = "";
      this.currentPassword = "";
      this.newPassword = "";
      this.newPasswordConfirm = "";
    },

    showMsgBox() {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxOk("変更しました", {
          title: "通知",
          size: "sm",
          buttonSize: "lg",
          okVariant: "info",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        })
        .then((value) => {
          this.boxTwo = value;
        });
    },
  },
};
</script>

<style scoped>
.label {
  text-align: left;
}
</style>
