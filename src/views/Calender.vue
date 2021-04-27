<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <b-spinner
        v-if="loading"
        label="Loading..."
        class="loading"
        variant="info"
      ></b-spinner>
      <div class="container" v-if="showTable" ref="test">
        <v-calendar
          class="calender"
          :min-date="minDate"
          v-if="isFullSize"
          is-expanded
        >
          <template #day-content="props">
            <div
              class="cell"
              v-b-popover.hover.top="showPopoverTodo(props.day.date)"
            >
              <div class="day" :style="{ color: checkToday(props.day.date) }">
                {{ props.day.day }}
              </div>
              <div class="content">
                <div v-if="checkExist" class="item-wrap">
                  <div
                    v-for="(item, index) in showDayTodo(props.day.date)"
                    :key="index"
                    :class="todoItemClass(index, props.day.date)"
                  >
                    <span v-if="index < 2">・</span>{{ cutLength(item) }}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </v-calendar>

        <div v-if="isPhoneSize">
          <v-date-picker v-model="date" is-expanded />
          {{date}}
          <div class="display-todo">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import todoListsRepository from "../repositories/todoListsRepository";
import $_convertDateToString from "../helpers/utile";
import $_createToday from "../helpers/utile";
import { mapState } from "vuex";
export default {
  components: {
    TheHomeHeader,
  },

  data() {
    return {
      todoLists: "",
      loading: true,
      showTable: false,
      width: window.innerWidth,
      isFullSize: true,
      isPhoneSize: false,
      date: new Date(),
    };
  },

  watch: {
    width() {
      this.selectCalendar();
    },
  },

  computed: {
    ...mapState(["loginUser"]),

    cutLength() {
      return function(item) {
        if (item.length > 14) {
          return item.substr(0, 13) + "...";
        }
        return item;
      };
    },

    checkToday() {
      return function(date) {
        if (this.$_createToday().getTime() === date.getTime()) {
          return "#16a2b8";
        }
      };
    },

    todoItemClass() {
      return function(index, date) {
        if (index === 2) {
          return "todo-another-item";
        }
        if (this.$_createToday() > date) {
          return "overdue-item";
        }
        if (index < 2) {
          return "todo-item";
        }
      };
    },

    minDate() {
      const begin = new Date(this.loginUser.created_at);
      return begin;
    },

    checkExist() {
      return function(date) {
        const day = this.$_convertDateToString(date);
        const deadlineLists = this.createDeadlineList(this.todoLists);
        const judge = deadlineLists.indexOf(day);

        if (judge === -1) {
          return false;
        }
        return true;
      };
    },

    showDayTodo() {
      return function(date) {
        const todoOfDay = this.createTodoOfDay(date);
        if (todoOfDay.length > 2) {
          const sliced = todoOfDay.filter(function(element, index) {
            return index < 2;
          });
          const another = `他${todoOfDay.length - 2}件...`;
          sliced.push(another);
          return sliced;
        }
        return todoOfDay;
      };
    },

    showPopoverTodo() {
      return function(date) {
        const list = this.createTodoOfDay(date);

        let data = "";
        for (let key in list) {
          data = `${data}・${list[key]}<br>`;
        }

        let checkLength = false;
        for (let key in list) {
          if (list[key].length > 14) {
            checkLength = true;
          }
        }

        if (checkLength === true) {
          return {
            html: true,
            content: data,
          };
        }

        if (list.length < 3) {
          return "";
        }

        return {
          html: true,
          content: data,
        };
      };
    },
  },

  created() {
    this.showTodo();
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.selectCalendar();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...$_createToday,
    ...$_convertDateToString,

    selectCalendar() {
      if (this.width >= 993) {
        this.isFullSize = true;
        this.isPhoneSize = false;
      } else {
        this.isFullSize = false;
        this.isPhoneSize = true;
      }
    },

    createTodoOfDay(date) {
      const day = this.$_convertDateToString(date);
      let todoOfDay = [];
      for (let i = 0; i < this.todoLists.length; i++) {
        if (day === this.todoLists[i].deadline) {
          todoOfDay.push(this.todoLists[i].todo_list);
        }
      }
      return todoOfDay;
    },

    createDeadlineList(lists) {
      let newLists = [];
      for (let i = 0; i < lists.length; i++) {
        newLists.push(lists[i].deadline);
      }
      return newLists;
    },

    async showTodo() {
      const resData = await todoListsRepository.getTodoForCalender(
        this.loginUser.id
      );
      this.todoLists = resData.data.data;
      this.loading = false;
      this.showTable = true;
    },

    handleResize() {
      this.width = window.innerWidth;
    },
  },
};
</script>

<style scoped>
.container {
  height: 570px;
}

.calender {
  height: 100%;
}

.day {
  text-align: right;
  margin-right: 10px;
}

.content {
  height: 50px;
  font-size: 50%;
}

.todo-item {
  text-align: left;
}

.todo-another-item {
  text-align: left;
  color: rgb(167, 167, 167);
}

.overdue-item {
  text-align: left;
  color: red;
}

.cell {
  border: 1px solid #efefef;
  margin: 0 -1px -1px 0;
}
</style>
