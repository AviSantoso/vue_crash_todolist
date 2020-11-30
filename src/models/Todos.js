const uuidv4 = require('uuid').v4;
const axios = require('axios');

class Todo {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
  static toJSON(todo) {
    return { ...todo.id, ...todo.title, ...todo.completed };
  }
  static fromJSON(data) {
    return new Todo(data.id, data.title, data.completed);
  }
}

class TodosModel {
  async create(title, completed = false) {
    const newTodo = new Todo(uuidv4(), title, completed);
    const storedTodo = await axios.post(process.env.VUE_APP_BACKEND_URL, Todo.toJSON(newTodo));
    return storedTodo;
  }
  async get() {
    return await axios.get(process.env.VUE_APP_BACKEND_URL);
  }
  async delete(id) {
    return await axios.delete(process.env.VUE_APP_BACKEND_URL + '/' + id);
  }
}

const model = new TodosModel();

export { model };