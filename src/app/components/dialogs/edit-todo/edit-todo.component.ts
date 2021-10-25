import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local.storage.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  todoDescription = '';
  todoList;
  todo;
  todoIndex;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<EditTodoComponent>,
    private toastr: ToastrService
  ) {
    this.todo = data.todo;
    this.todoIndex = data.todoIndex;
    this.todoDescription = this.todo['title'];
  }

  ngOnInit(): void {
    this.todoList = this.localStorageService.get('todoList');
  }

  editTodo() {
    if (this.todoDescription == '') {
      this.toastr.warning('Please enter the To-Do description', 'Empty field', {
        timeOut: 3000,
      });
    } else {
      this.todoList.list[this.todoIndex]['title'] = this.todoDescription;

      this.localStorageService.set('todoList', this.todoList);

      this.dialogRef.close();
    }
  }
}
