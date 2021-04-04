<template>
  <div id="app">
    <div class="content">
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fileInfo: "",
      showError: false,
      showInput: true,
      errorFileMessage: "※画像ファイルを選択して下さい",

    }
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
  }
};
</script>

<style scoped>
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
</style>
