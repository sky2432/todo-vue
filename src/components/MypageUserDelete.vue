<template>
  <div id="app">
    <div class="mypage-content">
      <div>
        <div class="mb-1">
          <b-alert show variant="danger">
            <h3>必ずご確認ください</h3>
            <p>
              アカウントを削除すると、これまでのデータはすべて削除されます。
            </p>
          </b-alert>
          <b-button v-b-modal.delete-confirm-modal variant="outline-danger"
            >アカウントを削除</b-button
          >
        </div>
      </div>
      <b-modal id="delete-confirm-modal" title="確認" centered>
        <p class="my-4">本当に削除しますか？</p>
        <template #modal-footer>
          <b-button size="lg" variant="outline-danger" @click="deleteUser">
            はい
          </b-button>
          <b-button size="lg" variant="outline-info" @click="deleteCancel">
            いいえ
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import usersRepository from "../repositories/usersRepository";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["loginUser"]),
  },

  methods: {
    async deleteUser() {
      const sendData = {
        id: this.loginUser.id,
      }
      await usersRepository.deleteUser(sendData);
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
