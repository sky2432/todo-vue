<template>
  <div>
      <b-calendar
        width="250px"
        label-help=""
        nav-button-variant="info"
        locale="ja"
        :value="value"
        @input="$emit('input', $event)"
        hide-header
        :min="new Date()"
        class="calendar"
      ></b-calendar>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    }
  },
};
</script>


