<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="row justify-content-center container">
      <b-list-group class="col-4">
        <b-list-group-item button @click="show = 1"
          >プロフィール</b-list-group-item
        >
        <b-list-group-item button @click="show = 2">各種変更</b-list-group-item>
        <b-list-group-item button @click="show = 3"
          >アカウント削除</b-list-group-item
        >
      </b-list-group>
      <div v-if="show === 1" class="col-8 content profile">
        <div>
          <p>
            <img class="userImage" :src="displayUserImage" />
          </p>
          <p>{{ showUserName }}</p>
          <b-form-file
            placeholder="画像を選択してください"
            @change="fileSelected"
            v-if="showInput"
          ></b-form-file>
          <p class="error" v-if="showError">{{ errorFileMessage }}</p>
          <b-button variant="info" class="mt-3" @click="fileUpload"
            >設定</b-button
          >
        </div>
      </div>

      <div v-if="show === 2" class="col-8 content name">
        <div>
          <b-form @submit.prevent="updateUser" novalidate>
            <b-form-group label="名前" label-for="name" class="label">
              <b-form-input
                id="name"
                v-model="userName"
                required
              ></b-form-input>
              <div class="error" v-if="this.errorsName">
                <p v-for="(error, index) in this.errorsName" :key="index">
                  {{ error }}
                </p>
              </div>
            </b-form-group>
            <b-form-group
              label="メールアドレス"
              label-for="email"
              class="label"
            >
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
              <b-button variant="info" type="submit">変更</b-button>
            </div>
          </b-form>
        </div>
      </div>

      <div v-if="show === 3" class="col-8 content delete-account">
        <div>
          <div class="mb-1">
            <b-alert show variant="danger">
              <h3>必ずご確認ください</h3>
              <p>
                アカウントを削除すると、これまでのデータはすべて削除されます。
              </p>
            </b-alert>
            <b-button v-b-modal.delete-confirm-modal variant="danger"
              >アカウントを削除</b-button
            >
          </div>
        </div>
        <b-modal id="delete-confirm-modal" title="確認" centered>
          <p class="my-4">本当に削除しますか？</p>
          <template #modal-footer>
            <b-button size="lg" variant="danger" @click="deleteUser">
              はい
            </b-button>
            <b-button size="lg" variant="info" @click="deleteCancel">
              いいえ
            </b-button>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TheHomeHeader from "../components/TheHomeHeader";
export default {
  components: {
    TheHomeHeader,
  },
  data() {
    return {
      show: 1,
      fileInfo: "",
      errorFileMessage: "※画像ファイルを選択して下さい",
      showError: false,
      showInput: true,
      userName: "",
      userEmail: "",
      errorsName: [],
      errorsEmail: [],
    };
  },
  computed: {
    showUserName() {
      return this.$store.state.loginUser.name;
    },
    displayUserImage() {
      return this.$store.state.userImage;
    },
  },
  methods: {
    // プロフィール画像設定
    fileSelected(event) {
      this.fileInfo = event.target.files[0];
      if (!this.fileInfo.type.match("image.*")) {
        this.showInput = false;
        this.$nextTick(function() {
          this.showInput = true;
        });
        this.showError = true;
      } else {
        this.showError = false;
      }
    },
    async fileUpload() {
      const formData = new FormData();
      formData.append("file", this.fileInfo);
      const userId = this.$store.state.loginUser.id;
      const resData = await axios.post(
        "http://127.0.0.1:8000/api/files/" + userId,
        formData,
        {
          headers: {
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      if (resData.data.data.file_path) {
        const userImage =
          "http://127.0.0.1:8000/storage/image/" + resData.data.data.file_path;
        this.$store.commit("storeUserImage", userImage);
        this.showInput = false;
        this.$nextTick(function() {
          this.showInput = true;
        });
      }
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

    // 名前・メールアドレス変更
    async updateUser() {
      const userId = this.$store.state.loginUser.id;
      const sendData = {
        name: this.userName,
        email: this.userEmail,
      };
      await axios
        .put("http://127.0.0.1:8000/api/users/" + userId, sendData)
        .then((response) => {
          console.log(response);
          this.$store.commit("updateUser", response.data.data);
          this.errorsName = "";
          this.errorsEmail = "";
          this.showMsgBox();
        })
        .catch((e) => {
          console.log(e.response);
          this.errorsName = e.response.data.errors.name;
          this.errorsEmail = e.response.data.errors.email;
        });
    },
    //ユーザーの名前・メールアドレスを取得
    getUserData() {
      this.userName = this.$store.state.loginUser.name;
      this.userEmail = this.$store.state.loginUser.email;
    },
    // アカウント削除
    async deleteUser() {
      const userId = this.$store.state.loginUser.id;
      await axios.delete("http://127.0.0.1:8000/api/users/" + userId);
      this.logout();
    },
    logout() {
      this.$store.dispatch("logout");
    },
    deleteCancel() {
      this.$bvModal.hide("delete-confirm-modal");
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
  overflow: hidden;
}
.content {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}
.userImage {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
.label {
  text-align: left;
}
</style>
