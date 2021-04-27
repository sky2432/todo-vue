<template>
  <div>
    <table class="table">
      <p>ユーザー管理</p>
      <!-- Todoリストの表示 -->
      <tr>
        <th>id</th>
        <th></th>
        <th>ユーザー名</th>
        <th>メールアドレス</th>
        <th></th>
      </tr>
      <tr
        class="list"
        v-for="user in itemsForList"
        :key="user.id"
        id="my-table"
      >
        <td>
          {{ user.id }}
        </td>
        <td style="text-align: right">
          <img class="userImage" :src="createFileURL(user.file_path)" />
        </td>
        <td>
          {{ user.name }}
        </td>
        <td>
          {{ user.email }}
        </td>
        <!-- 詳細ボタン -->
        <td class="detail-btn-wrap">
          <b-button
            variant="outline-info"
            size="sm"
            @click="moveUserDeatail(user.id)"
          >
            <b-icon icon="pencil-square"></b-icon>
            詳細
          </b-button>
        </td>
      </tr>
    </table>
  </div>
</template>
