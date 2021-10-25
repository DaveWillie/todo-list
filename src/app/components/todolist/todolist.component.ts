import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskComponent } from '../dialogs/delete-task/delete-task.component';
import { AddTaskComponent } from '../dialogs/add-task/add-task.component';
import { AddTodoComponent } from '../dialogs/add-todo/add-todo.component';
import { DeleteTodoComponent } from '../dialogs/delete-todo/delete-todo.component';
import { EditTodoComponent } from '../dialogs/edit-todo/edit-todo.component';
import { EditTaskComponent } from '../dialogs/edit-task/edit-task.component';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  selectedTodo;
  selectedIndex: number = 0;

  todo;

  // todo = {
  //   list: [
  //     {
  //       id: '1',
  //       title: 'Test 1',
  //       tasks: [
  //         { status: false, content: 'This is task 1' },
  //         { status: false, content: 'This is task 2' },
  //         { status: false, content: 'This is task 3' },
  //         { status: false, content: 'This is task 4' },
  //         { status: false, content: 'This is task 5' },
  //       ],
  //     },
  //     {
  //       id: '2',
  //       title: 'Test 2',
  //       tasks: [
  //         { status: false, content: 'This is task 1..' },
  //         { status: false, content: 'This is task 2..' },
  //         { status: false, content: 'This is task 3..' },
  //         { status: false, content: 'This is task 4..' },
  //       ],
  //     },
  //   ],
  // };

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.todo = this.localStorageService.get('todoList');

    if (this.todo) {
      this.selectedTodo = this.todo.list[0];
    }
  }

  drop(event) {
    moveItemInArray(
      this.todo['list'][this.selectedIndex]['tasks'],
      event.previousIndex,
      event.currentIndex
    );

    this.selectedTodo = this.todo.list[this.selectedIndex];

    this.localStorageService.set('todoList', this.todo);
  }

  loadTasks(index) {
    this.selectedIndex = index;
    this.selectedTodo = this.todo.list[this.selectedIndex];
  }

  checkTask(event, index) {
    this.todo['list'][this.selectedIndex]['tasks'][index]['status'] = event;
    this.localStorageService.set('todoList', this.todo);
  }

  openAddTodo() {
    let dialogRef = this.dialog.open(AddTodoComponent, {
      width: '50%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }

  openAddTask() {
    let dialogRef = this.dialog.open(AddTaskComponent, {
      width: '50%',
      data: {
        data: this.selectedIndex,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }

  openDeleteTodo(todoId) {
    console.log(todoId);
    let dialogRef = this.dialog.open(DeleteTodoComponent, {
      data: {
        todoId: todoId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }

  openDeleteTask(taskId) {
    let dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: {
        selectedIndex: this.selectedIndex,
        taskId: taskId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }

  openEditTodo(todo, todoIndex) {
    let dialogRef = this.dialog.open(EditTodoComponent, {
      width: '50%',
      data: {
        todo: todo,
        todoIndex: todoIndex,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }

  openEditTask(task, taskIndex) {
    let dialogRef = this.dialog.open(EditTaskComponent, {
      width: '50%',
      data: {
        selectedIndex: this.selectedIndex,
        task: task,
        taskIndex: taskIndex,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }

  reloadData() {
    this.todo = this.localStorageService.get('todoList');
    this.selectedTodo = this.todo.list[this.selectedIndex];
  }

  resetSystem() {
    this.localStorageService.clearAll();
    window.location.reload();
  }
}
