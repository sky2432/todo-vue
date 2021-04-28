<template>
  <div>
    <b-pagination
      :value="currentPage"
      @input="chengePaginate($event)"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
      class="mt-3"
      :size="size"
    >
      <template #first-text><span class="text-info">«</span></template>
      <template #prev-text><span class="text-info">‹</span></template>
      <template #next-text><span class="text-info">›</span></template>
      <template #last-text><span class="text-info">»</span></template>
    </b-pagination>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      default: 'sm',
    }
  },

  data() {
    return {
      perPage: 5,
      currentPage: 1,
    };
  },

  computed: {
    rows() {
      return this.lists.length;
    },
  },

  watch: {
    lists() {
      this.itemsForList();
    }
  },

  created() {
    this.itemsForList();
  },

  methods: {
    chengePaginate(event) {
      this.currentPage = event;
      this.itemsForList();
    },

    itemsForList() {
      const newList = this.lists.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
      this.$emit("paginate", newList);
    },
  },
};
</script>

