module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "TodoList",
    },
  },
  devServer: {
    watchOptions: {
      poll: true,
    },
    host: "localhost",
  },
};
