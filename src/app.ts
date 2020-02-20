import Vue from 'vue';
import { ToDoList } from './storage';
import { getCurrentTime, filters } from './utils';
import { showToast } from './toast';

const toDoStorage = new ToDoList();

export const app = new Vue({
  data: {
    todos: toDoStorage.fetch(),
    newTodo: '',
    editedTodo: null,
    visibility: 'all',
    uid: toDoStorage.getUid(),
    toastMessage: ''
  },
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos);
    },
    remaining: function () {
      return filters[this.visibility](this.todos).length;
    },
    completedTodos: function () {
      return filters.completed(this.todos).length;
    }
  },
  filters: {
    pluralize: function (n: number) {
      return n === 1 ? 'item' : 'items';
    }
  },
  methods: {
    sortToDos: function () {
      this.todos.sort((a: {completed: boolean | string}) => {
        if (a.completed === true || a.completed === 'true') {
          return 1;
        } else {
          return -1;
        }
      });
    },
    toggleStatus: function (index: number, id: number, completed: boolean | string) {
      this.todos[index !== id ? index : id].completed = completed;
      this.sortToDos();
      toDoStorage.save(this.todos);
      this.toastMessage = `Move to ${completed ? 'completed' : 'active'}!`;
      showToast();
    },
    addTodo: function () {
      const value = this.newTodo;
      if (!value) {
        return;
      }
      this.todos.push({
        id: this.uid++,
        title: value,
        completed: false,
        time: getCurrentTime()
      });
      this.newTodo = '';
      this.sortToDos();
      toDoStorage.save(this.todos);
      this.toastMessage = 'Add a TODO!';
      showToast();
    },
    removeTodo: function (todo: {}) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.sortToDos();
      toDoStorage.save(this.todos);
      this.toastMessage = 'Remove a TODO!';
      showToast();
    },
    editTodo: function (todo: {title: string}) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit: function (todo: {title: string}) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
      toDoStorage.save(this.todos);
      this.toastMessage = 'Edit a TODO!';
      showToast();
    },
    cancelEdit: function (todo: {title: string}) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    removeCompleted: function () {
      this.todos = filters.active(this.todos);
      toDoStorage.save(this.todos);
      this.toastMessage = 'Remove completed TODOs!';
      showToast();
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
});