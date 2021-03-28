<template>
  <div id="app">
    <HomeHeader></HomeHeader>
    <div class="row justify-content-center container">
      <b-list-group class="col-4">
        <b-list-group-item button @click="show = 1"
          >プロフィール</b-list-group-item
        >
        <b-list-group-item button @click="show = 2">名前変更</b-list-group-item>
        <b-list-group-item button @click="show = 3"
          >アカウント削除</b-list-group-item
        >
      </b-list-group>
      <div v-if="show === 1" class="col-8 content profile">
        <div>
          <b-form-file
            placeholder="画像を選択してください"
            @change="fileSelected"
          ></b-form-file>
          <b-button variant="info" class="mt-3" @click="fileUpload"
            >設定</b-button
          >
        </div>
      </div>

      <div v-if="show === 2" class="col-8 content name">
        <div>名前変更</div>
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
            <b-button size="lg" variant="danger" @click="deleteAccount">
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
import HomeHeader from "../components/HomeHeader";
export default {
  components: {
    HomeHeader,
  },
  data() {
    return {
      show: 1,
      fileInfo: "",
    };
  },
  methods: {
    fileSelected(event) {
      this.fileInfo = event.target.files[0];
      console.log(this.fileInfo);
    },
    async fileUpload() {
      const formData = new FormData();
      formData.append("file", this.fileInfo);
      // console.log(formData);
      // console.log(formData.get('file'));
      // const sendData = {
      //   file: this.fileInfo,
      // }
      const userId = this.$store.state.name.id;
      const response = await axios.post(
        "http://127.0.0.1:8000/api/fileUpload/" + userId,
        formData,
        {
          headers: {
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );
      console.log(response);
    },
    async deleteAccount() {
      const userId = this.$store.state.name.id;
      await axios.delete("http://127.0.0.1:8000/api/deleteAccount/" + userId);
      this.logout();
    },
    logout() {
      this.$store.dispatch("logout");
    },
    deleteCancel() {
      this.$bvModal.hide("delete-confirm-modal");
    },
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
</style>
