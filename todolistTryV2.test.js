const Todo = require('./todo');
const TodoList = require('./todolist');

// eslint-disable-next-line max-lines-per-function
describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('calling size returns the size of the todolist', () => {
    expect(list.size()).toBe(3);
  });

  test("see if we get back the array", () => {
    // eslint-disable-next-line max-len
    //return from array is an array of to dos not the todolist (example: list) itself
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('get back firs titem', () => {
    expect(list.first()).toBe(todo1);
  });

  test('calling last returns the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test("testing if shift functionality works", () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop() removes last item in list and returns it', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("see if all the items in the list is done", () => {
    expect(list.isDone()).toBe(false);
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    expect(list.isDone()).toBe(true);
  });

  test("throw error when not adding todo item", () => {
    expect(() => list.add(5)).toThrow(TypeError);
  });

  test("testing if can retrive item by index", () => {
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
    expect(list.itemAt(0)).toEqual(todo1);
  });

  test("marking a single todo done", () => {
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
    list.markDoneAt(0);
    expect(list.allNotDone().toArray()).toEqual([todo2, todo3]);
  });

  test('markUndoneAt marks todo at given index undone', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('markAllDone marks all todos in list done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes todo at given index', () => {
    expect(() => list.removeAt(6)).toThrow(ReferenceError);
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  xtest('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
    [ ] Buy milk
    [ ] Clean room
    [ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  xtest('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----
    [ ] Buy milk
    [X] Clean room
    [ ] Go to the gym`;

    list.markDoneAt(1);

    expect(list.toString()).toBe(string);
  });

  xtest('toString returns different string for all done todos', () => {
    let string = `---- Today's Todos ----
  [X] Buy milk
  [X] Clean room
  [X] Go to the gym`;

    list.markAllDone();

    expect(list.toString()).toBe(string);
  });

  test("test the for each method", () => {
    list.forEach(item => item.markDone());
    expect(list.isDone()).toBe(true);
  });

  test('test the filter method', () => {
    list.markDoneAt(0);
    expect(list.filter(item => item.isDone()).toArray()).toEqual([todo1]);
  });

});