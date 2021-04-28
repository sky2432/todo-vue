<template>
  <b-form-select
    :value="value"
    @input="$emit('input', $event)"
    :options="options"
    size="sm"
    class="mt-2 remind-day-selecter"
  ></b-form-select>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
  },
  data() {
    return {
      options: [
        { value: null, text: "リマインドを設定" },
        { value: 0, text: "当日" },
        { value: 1, text: "1日前" },
        { value: 2, text: "2日前" },
      ],
    };
  },
};
</script>

<style></style>
