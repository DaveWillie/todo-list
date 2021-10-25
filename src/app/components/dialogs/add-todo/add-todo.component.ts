import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddTodoComponent>,
    private toastr: ToastrService
  ) {}

  todoTitle = '';
  todoList;

  ngOnInit(): void {
    this.todoList = this.localStorageService.get('todoList');
  }

  addTodo() {
    if (this.todoTitle == '') {
      this.toastr.warning(
        'Please enter the To-Do list description',
        'Empty field',
        {
          timeOut: 3000,
        }
      );
    } else if (!this.todoList) {
      const id: string = uuid();

      const todoMap = {
        list: [
          {
            id: id,
            title: this.todoTitle,
            tasks: [],
          },
        ],
      };

      this.localStorageService.set('todoList', todoMap);

      this.dialogRef.close();
    } else {
      const id: string = uuid();

      const todoMap = {
        id: id,
        title: this.todoTitle,
        tasks: [],
      };

      let arr = this.todoList.list;
      arr.push(todoMap);

      this.todoList.list = arr;

      this.localStorageService.set('todoList', this.todoList);

      this.dialogRef.close();
    }
  }
}
