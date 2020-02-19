const STORAGE_KEY = 'myTODOs';

export class ToDoList {
  public uid: number;

  public fetch = (): [] => {
    const todos: [] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    todos.forEach(function (todo: {id: number}, index: number) {
      todo.id = index;
    })
    this.uid = todos.length;
    return todos;
  };

  public save = (todos: []): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  };

  public getUid = (): number => this.uid;
}