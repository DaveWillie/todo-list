import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskDescription = '';
  todoList;
  selectedIndex;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private toastr: ToastrService
  ) {
    this.selectedIndex = data.data;
  }

  ngOnInit(): void {
    this.todoList = this.localStorageService.get('todoList');
  }

  addTask() {
    if (this.taskDescription == '') {
      this.toastr.warning('Please enter the Task description', 'Empty field', {
        timeOut: 3000,
      });
    } else {
      const id: string = uuid();

      const taskMap = {
        id: id,
        status: false,
        content: this.taskDescription,
      };

      let arr = this.todoList.list[this.selectedIndex].tasks;
      arr.push(taskMap);

      this.todoList.list[this.selectedIndex].tasks = arr;

      this.localStorageService.set('todoList', this.todoList);

      this.dialogRef.close();
    }
  }
}
