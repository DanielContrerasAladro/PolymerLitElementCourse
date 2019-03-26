import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/directives/repeat';
import './todo-item';

class ListItems extends LitElement {
  static get properties() {
    return {
      todoList: Array
    }
  }

  render() {
    this.todoList = JSON.parse(this.todoList);
    if (this.todoList.length > 0) {
      return html`
<style>
    .lists {
        padding-left:350px;
        margin:0 auto;
        max-width:500px;
    }
    .list {
        transform-origin:center bottom;
        transition:200ms all linear;
    }
    .list .title {
        color:#B8D4FF;
        font-size:1.5rem;
        letter-spacing:5px;
        text-transform: uppercase;
        text-align: center;
        margin:3.5rem 0 3.5rem 0;
        line-height: 1;
    }
    .list .list-wrapper  {
        list-style: none;
        margin:0 0.5rem;
        padding:0;
    }
    @media (max-width: 576px) and (orientation:portrait) {
        .lists {
            padding:0 1rem;
            margin-bottom:5rem;
        }
        .list .title {
            margin:1.5rem 1rem;
            font-size:1.5rem;
        }
    }
</style>    
        <div class='lists'>
          <div class='list'>
            <h2 class='title'>To Do List</h2>
              <div class='list-wrapper'>
                ${repeat(this.todoList, (i) => i.id, (i) => html`
                  <todo-item todoItem=${JSON.stringify(i)}></todo-item>
                `)}
            </div>            
          </div>
        </div>
      `;
    }
  }

  constructor() {
    super();
    const storedTodoList = localStorage.getItem('todo-list');
    this.todoList = storedTodoList === null ? [] : JSON.parse(storedTodoList);  
  }

}

customElements.define('list-items', ListItems);