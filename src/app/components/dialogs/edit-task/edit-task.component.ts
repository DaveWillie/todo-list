import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local.storage.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  taskDescription = '';
  todoList;
  selectedIndex;
  task;
  taskIndex;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    private toastr: ToastrService
  ) {
    this.selectedIndex = data.selectedIndex;
    this.task = data.task;
    this.taskIndex = data.taskIndex;
    this.taskDescription = this.task['content'];
  }

  ngOnInit(): void {
    this.todoList = this.localStorageService.get('todoList');
  }

  editTask() {
    if (this.taskDescription == '') {
      this.toastr.warning('Please enter the Task description', 'Empty field', {
        timeOut: 3000,
      });
    } else {
      this.todoList.list[this.selectedIndex].tasks[this.taskIndex]['content'] =
        this.taskDescription;

      this.localStorageService.set('todoList', this.todoList);

      this.dialogRef.close();
    }
  }
}
