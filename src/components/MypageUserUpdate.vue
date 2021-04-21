<template>
  <div id="app">
    <div class="mypage-content">
      <div class="form-wrap">
        <b-form @submit.prevent="updateUser" novalidate>
          <b-form-group label="名前" label-for="name" class="label">
            <b-form-input id="name" v-model="userName" required></b-form-input>
            <div class="error" v-if="this.errorsName">
              <p v-for="(error, index) in this.errorsName" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <b-form-group label="メールアドレス" label-for="email" class="label">
            <b-form-input
              id="email"
              type="email"
              v-model="userEmail"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsEmail">
              <p v-for="(error, index) in this.errorsEmail" :key="index">
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
      userName: "",
      userEmail: "",
      errorsName: [],
      errorsEmail: [],
    };
  },

  computed: {
    ...mapState(["loginUser"]),
  },

  created() {
    this.getUserData();
  },

  methods: {
    //ユーザーの名前・メールアドレスを取得
    getUserData() {
      this.userName = this.loginUser.name;
      this.userEmail = this.loginUser.email;
    },

    // 名前・メールアドレス変更
    async updateUser() {
      const sendData = {
        name: this.userName,
        email: this.userEmail,
      };
      await usersRepository
        .updateUser(this.loginUser.id, sendData)
        .then((response) => {
          console.log(response);
          this.$store.commit("updateUser", response.data.data);
          this.errorsName = "";
          this.errorsEmail = "";
          this.showMsgBox();
        })
        .catch((e) => {
          this.errorsName = e.response.data.errors.name;
          this.errorsEmail = e.response.data.errors.email;
        });
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
.form-wrap {
  width: 50%;
}

.label {
  text-align: left;
}
</style>
