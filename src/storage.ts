import * as SecureLS from 'secure-ls';

const STORAGE_KEY = 'myTODOs';
const LS = new SecureLS({encodingType: 'aes'});

export class ToDoList {
  public uid: number;

  public fetch = (): [] => {
    // const todos: [] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const todos: [] = LS.get(STORAGE_KEY) || [];
    todos.forEach(function (todo: {id: number}, index: number) {
      todo.id = index;
    })
    this.uid = todos.length;
    return todos;
  };

  public save = (todos: []): void => {
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    LS.set(STORAGE_KEY, todos)
  };

  public getUid = (): number => this.uid;
}