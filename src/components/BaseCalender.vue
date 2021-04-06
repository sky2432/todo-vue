<template>
  <div id="app">
      <b-calendar
        width="200px"
        label-help=""
        nav-button-variant="info"
        locale="ja"
        :value="value"
        @input="$emit('input', $event)"
      ></b-calendar>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>
