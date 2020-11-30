<template>
  <div id="app">
    <div class="container">
      <Header />
      <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
      <AddTodo v-on:add-todo="addTodo" />
    </div>
  </div>
</template>

<script>
import Header from "./components/layout/Header";

import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import axios from "axios";

export default {
  name: "App",
  components: {
    Todos,
    Header,
    AddTodo,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    updateTodos: function () {
      axios
        .get("https://crudcrud.com/api/184a8f42d4874e6a8c2f95226c00189f/todos")
        .then((response) => {
          const { data } = response;
          console.log(data);
          this.todos = data;
        });
    },
    deleteTodo(id) {
      axios
        .delete(
          "https://crudcrud.com/api/184a8f42d4874e6a8c2f95226c00189f/todos/" +
            id
        )
        .then(() => this.updateTodos());
    },
    addTodo(newTodo) {
      axios
        .post(
          "https://crudcrud.com/api/184a8f42d4874e6a8c2f95226c00189f/todos",
          newTodo
        )
        .then(() => this.updateTodos());
    },
  },
  created() {
    this.updateTodos();
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
</style>
