export default {
  data() {
    return {
      width: window.innerWidth,
    };
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
  },
};