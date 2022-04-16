export class Stack<T> {
  private wmkey = {};
  private items = new WeakMap<typeof this.wmkey, T[]>();

  constructor() {
    this.items.set(this.wmkey, []);
  }

  push(element: T) {
    let stack = this.items.get(this.wmkey);
    stack && stack.push(element);
  }

  pop() {
    let stack = this.items.get(this.wmkey);
    return stack && stack.pop();
  }

  peek() {
    let stack = this.items.get(this.wmkey);
    return stack && stack[stack.length - 1];
  }

  clear() {
    this.items.set(this.wmkey, []);
  }

  size() {
    return this.items.get(this.wmkey)?.length;
  }
}
