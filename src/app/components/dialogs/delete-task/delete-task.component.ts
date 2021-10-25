import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local.storage.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
})
export class DeleteTaskComponent implements OnInit {
  todoList;
  selectedIndex;
  taskId = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<DeleteTaskComponent>
  ) {
    this.selectedIndex = data.selectedIndex;
    this.taskId = data.taskId;
  }

  ngOnInit(): void {
    this.todoList = this.localStorageService.get('todoList');
  }

  deleteTask() {
    let array = this.todoList.list[this.selectedIndex].tasks;

    var filtered = array.filter((el) => {
      return el.id != this.taskId;
    });

    this.todoList.list[this.selectedIndex].tasks = filtered;

    this.localStorageService.set('todoList', this.todoList);

    this.dialogRef.close();
  }
}
