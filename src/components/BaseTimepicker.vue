<template>
  <b-form-timepicker
    :value="value"
    @input="$emit('input', $event)"
    size="sm"
    locale="ja"
    label-close-button="閉じる"
    close-button-variant="info"
    minutes-step="10"
    hide-header
  >
  </b-form-timepicker>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
  },
};
</script>

