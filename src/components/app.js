import { LitElement, html } from '@polymer/lit-element';
import './add-item';
import './list-item';

class TodoApp extends LitElement {
  static get properties() {
    return {
      todoList: Array
    }
  }

  constructor() {
    super();
    const storedTodoList = localStorage.getItem('todo-list');
    this.todoList = storedTodoList === null ? [] : JSON.parse(storedTodoList);

    this.addEventListener('addItem', (e) => {
      this.todoList = e.detail.todoList;
    });

    this.addEventListener('removeItem', (e) => {
      let index = this.todoList.map(function (item) { return item.id }).indexOf(e.detail.item);
      this.todoList.splice(index, 1);
      this.todoList = _.clone(this.todoList);
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });    

    this.addEventListener('itemDone', (e) => {
      let index = this.todoList.map(function (item) { return item.id }).indexOf(e.detail.item);
      this.todoList[index].done = !this.todoList[index].done;
      localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });     
  }

  render() {
    return html`
      <add-item></add-item>
      <list-items todoList=${JSON.stringify(this.todoList)}></list-items>
      `;
  }
}

customElements.define('todo-app', TodoApp);