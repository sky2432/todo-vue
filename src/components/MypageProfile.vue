<template>
  <div id="app">
    <div class="mypage-content">
      <div>
        <p>
          <img class="user-image" :src="userImage" />
        </p>
        <p>{{ loginUser.name }}</p>
        <b-form-file
          placeholder="画像を選択してください"
          @change="fileSelected"
          v-if="showInput"
        ></b-form-file>
        <p class="error" v-if="showError">{{ errorFileMessage }}</p>
        <b-button
          class="mt-3"
          variant="outline-info"
          :disabled="loginUser.role === 'guest'"
          @click="fileUpload"
          >設定</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import fileRepository from "../repositories/fileRepository";
import { mapState } from "vuex";

export default {
  data() {
    return {
      fileInfo: "",
      showError: false,
      showInput: true,
      errorFileMessage: "※画像ファイルを選択して下さい",
    };
  },

  computed: {
    ...mapState(["loginUser", "userImage"]),
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
      const resData = await fileRepository.uploadImage(
        this.loginUser.id,
        formData
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
  },
};
</script>
