import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/class/task';
import { TaskService } from '../../../shared/services/task.service';
import Swal from 'sweetalert2'
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  nameUser: string;
  wiw: string;
  dataimage:any;
  public form: FormGroup;
  public newTask: Task;
  users : [];
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
          this.dataimage = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

 
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(private fb: FormBuilder, private TaskInfo: TaskService) { }

  ngOnInit(): void {
    this.nameUser = JSON.parse( localStorage.getItem('user'))['NAME'] + " " + JSON.parse( localStorage.getItem('user'))['LAST_NAME'];
    this.wiw = JSON.parse( localStorage.getItem('user'))['WIW'];
    this.getUsers();
    this.declareForm();
  }


  saveTask() {
    if (this.form.valid) {
      this.newTask = new Task();
      this.newTask.DateCreate = this.form.controls.date.value;
      this.newTask.NameResponsible = this.form.controls.nameresponsible.value.trim();
      this.newTask.WIWResponsible = this.form.controls.wiwresponsible.value.trim();
      this.newTask.NameReportTo = this.form.controls.nameReportTo.value.trim();
      this.newTask.WIWReportTo = this.form.controls.wiwReportTo.value.trim();
      this.newTask.TaskDesc = this.form.controls.task.value.trim();
      this.newTask.Comments = this.form.controls.comment.value.trim();
      this.newTask.Image = this.dataimage;
      this.newTask.Status = true;
      this.newTask.Equipment = this.form.controls.equipment.value.trim();
      this.newTask.Priority = this.form.controls.priority.value.trim();
      this.newTask.DueDate = this.form.controls.duedate.value;
    
      this.TaskInfo.addTask(this.newTask).subscribe((data: any) => {
        if(data['Error'] != true){
             if(data['Result'] === true){
              this.form.reset();
              this.declareForm();
              this.fileAttr = 'Choose File';
              this.dataimage = "";
              Swal.fire({
                title: 'Success!!',
                text: 'Se agrego correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
              });
    
            } else {
              Swal.fire({
                title: 'Error!!',
                text: 'Ocurrio un error' + data['Result'],
                icon: 'error',
                confirmButtonText: 'OK'
              })
    
            }
        } else {
          Swal.fire({
            title: 'Error!!',
            text: 'Ocurrio un error' + data['Result'],
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
  
    }
  }

  declareForm(){
    this.form = this.fb.group({
      date: [new Date(), Validators.compose([Validators.required])],
      nameresponsible: [this.nameUser, Validators.compose([Validators.required])],
      wiwresponsible: [this.wiw, Validators.compose([Validators.required])],
      nameReportTo: [null, Validators.compose([Validators.required])],
      wiwReportTo: [this.wiw, Validators.compose([Validators.required])],
      equipment: [null, Validators.compose([Validators.required])],
      task: [null, Validators.compose([Validators.required])],
      priority: [null, Validators.compose([Validators.required])],
      comment: [null, Validators.compose([Validators.required])],
      duedate: [new Date(), Validators.compose([Validators.required])],
    });
  }

  getUsers(){
    this.TaskInfo.getUsers().subscribe((data: any) => {
      if(data['Error'] != true){
          this.users = data['Result'];
      } else {
        Swal.fire({
          title: 'Error!!',
          text: 'Ocurrio un error' + data['Result'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });

  }

  userReportTo(userInfo){
    this.form.controls.nameReportTo.setValue(userInfo.source.triggerValue);
    this.form.controls.wiwReportTo.setValue(userInfo.value);
  }


}
