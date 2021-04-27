<template>
  <div>
    <table class="table">
          <tr>
            <th>Todo</th>
            <th>完了日</th>
            <th></th>
          </tr>
          <tr
            class="list"
            v-for="list in itemsForList"
            :key="list.id"
            id="my-table"
          >
            <td class="done-todo" :id="`popover-target-${list.id}`">
              <b-icon
                icon="check2-square"
                @click="returnTodo(list.id)"
                class="done-check-icon"
              ></b-icon>
              {{ cutLength(list.todo_list) }}
            </td>

            <!-- Todo全文表示ポップオーバー -->
            <b-popover
              v-if="checkLength(list.todo_list)"
              :target="`popover-target-${list.id}`"
              triggers="hover"
              placement="top"
            >
              {{ list.todo_list }}
            </b-popover>

            <td class="done-todo">
              {{ convertDay(list.done_at) }}
            </td>

            <td class="btn-wrap">
              <b-button
                class="mr-5"
                variant="outline-info"
                size="sm"
                @click="returnTodo(list.id)"
                >戻す</b-button
              >
              <b-button
                variant="outline-info"
                size="sm"
                @click="deleteTodo(list.id)"
              >
                <b-icon icon="trash"></b-icon>
                削除</b-button
              >
            </td>
          </tr>
        </table>

  </div>
</template>
