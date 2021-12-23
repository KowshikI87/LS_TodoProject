// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  getTitle() {
    return this.title;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  _validateIndex(index) { // _ in name indicates "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  //from the call to forEach method
  //we have to pass in one input: each element of array
  forEach(callback) {
    this.todos.forEach(callback);
  }

  // filter(callback) {
  //   return this.todos.filter(callback)
  // }

  //we call the filter method on list
  //filter method calls the forEach method on list
    //we pass callback1 to forEach
    //callback1 calls callback2 and if callback2 returns truthy value for an element
    //then we push the element to array
  //this is like calling the forEach method in filter method
  //to manually implement the filter method
  filter(callback) {
    let newList = new TodoList(this.title);
    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });

    return newList;
  }

  // //my implementation
  // findByTitle(title) {
  //   let toDosByTitle = this.filter(todo => todo.getTitle() === title);
  //   return toDosByTitle.length > 0 ? toDosByTitle : undefined;
  // }

  //LS implementation is better
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let toMarkToDo = this.findByTitle(title)
    //using strict equality operator to be
    //more explicit then trying to use truthiness of
    //toMarkToDo
    if (toMarkToDo !== undefined) {
      toMarkToDo.markDone()
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  toArray() {
    //not sure what the point of slice is
    return this.todos.slice();
  }

}

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

let doneTodos = list.filter(todo => todo.isDone());
console.log(doneTodos);
console.log(list.findByTitle("Clean room"));