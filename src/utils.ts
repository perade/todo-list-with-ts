export const filters = {
  all: function (todos: []) {
    return todos;
  },
  active: function (todos: []) {
    return todos.filter(function (todo: {completed: boolean}) {
      return !todo.completed;
    })
  },
  completed: function (todos: []) {
    return todos.filter(function (todo: {completed: boolean}) {
      return todo.completed;
    })
  }
};

export function getCurrentTime () {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${
    hours < 10 ? `0${hours}` : hours
  }:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};