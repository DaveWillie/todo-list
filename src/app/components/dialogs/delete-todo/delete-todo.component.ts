import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss'],
})
export class DeleteTodoComponent implements OnInit {
  todoList;
  todoId = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<DeleteTaskComponent>
  ) {
    this.todoId = data.todoId;
  }

  ngOnInit(): void {
    this.todoList = this.localStorageService.get('todoList');
  }

  deleteTodo() {
    let array = this.todoList.list;

    var filtered = array.filter((el) => {
      return el.id != this.todoId;
    });

    console.log(filtered);
    this.todoList.list = filtered;

    this.localStorageService.set('todoList', this.todoList);

    this.dialogRef.close();
  }
}
