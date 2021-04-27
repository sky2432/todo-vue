<template>
  <div id="app">
    <div class="mypage-content">
      <div class="form-wrap">
        <b-form class="form" @submit.prevent="updatePassword" novalidate>
          <b-form-group
            label="現在のパスワード"
            label-for="currentPassword"
            class="label password-form"
          >
            <b-form-input
              id="currentPassword"
              v-model="currentPassword"
              :type="currentPasswordInputType"
            ></b-form-input>
            <b-icon
              :icon="currentPasswordIconType"
              class="eye-icon"
              @click="changeEyeChecked('current')"
            ></b-icon>
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
            class="label password-form"
          >
            <b-form-input
              id="newPassword"
              :type="newPasswordInputType"
              v-model="newPassword"
            ></b-form-input>
            <b-icon
              :icon="newPasswordIconType"
              class="eye-icon"
              @click="changeEyeChecked('new')"
            ></b-icon>
            <div class="error" v-if="this.errorsNewPassword">
              <p v-for="(error, index) in this.errorsNewPassword" :key="index">
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
      currentPasswordEyeChecked: false,
      newPasswordEyeChecked: false,
      errorsCurrentPassword: [],
      errorsNewPassword: [],
    };
  },

  computed: {
    ...mapState(["loginUser"]),

    currentPasswordInputType() {
      return this.currentPasswordEyeChecked ? "text" : "password";
    },

    currentPasswordIconType() {
      return this.currentPasswordEyeChecked ? "eye-slash" : "eye";
    },

    newPasswordInputType() {
      return this.newPasswordEyeChecked ? "text" : "password";
    },

    newPasswordIconType() {
      return this.newPasswordEyeChecked ? "eye-slash" : "eye";
    },
  },

  methods: {
    updatePassword() {
      const sendData = {
        id: this.loginUser.id,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      };
      usersRepository
        .updatePassword(sendData)
        .then((response) => {
          this.resetData();
          this.showMsgBox();
        })
        .catch((e) => {
          this.errorsCurrentPassword = e.response.data.errors.currentPassword;
          this.errorsNewPassword = e.response.data.errors.newPassword;
        });
    },

    resetData() {
      this.currentPassword = "";
      this.newPassword = "";
      this.errorsCurrentPassword = "";
      this.errorsNewPassword = "";
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

    changeEyeChecked(type) {
      if (type === "current") {
        this.currentPasswordEyeChecked = !this.currentPasswordEyeChecked;
      }
      if (type === "new") {
        this.newPasswordEyeChecked = !this.newPasswordEyeChecked;
      }
    },
  },
};
</script>

<style scoped>
.form-wrap {
  width: 50%;
}

.label {
  text-align: left;
}

@media screen and (max-width: 992px) {
  .form-wrap {
    width: 60%;
  }
}

@media screen and (max-width: 576px) {
  .form-wrap {
    width: 80%;
  }
}
</style>
