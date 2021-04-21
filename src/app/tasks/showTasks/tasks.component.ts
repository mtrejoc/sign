import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/shared/class/task';
import { Filters } from 'src/app/shared/class/filters';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
tasks = [];
priority = ['A','B','C'];
status = ['Abierto','Cerrado'];
dateNow = new Date();
idTask: any;
nameUser: string;
wiw: string;
week: any;
weeks = [];
public newTask: Task;
public newFilter: Filters;
fileAttr = 'Choose File';
dataimage:any;
cargados: any; 
abiertos: any;
cerrados: any;
dtOptions: any;
dtTrigger: Subject<any> = new Subject<any>();
@ViewChild('fileInput') fileInput: ElementRef;

  constructor(private TaskInfo: TaskService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.nameUser = JSON.parse( localStorage.getItem('user'))['NAME'] + " " + JSON.parse( localStorage.getItem('user'))['LAST_NAME'];
    this.wiw = JSON.parse( localStorage.getItem('user'))['WIW'];
     var week = this.getWeekNumberNonISO(this.dateNow)
    this.getAllTask(week, this.priority, this.status);
    this. getWeeks();
    this.loadTable();
   
  }


  getAllTask(week, priority, status){
    this.week = week;
    this.newFilter = new Filters();
    this.newFilter.week = parseInt(week) ;
    this.newFilter.priority = priority;
    this.newFilter.status = status;
    this.TaskInfo.getTask(this.newFilter).subscribe((data: any) => {
      if(data['Error'] != true){
           this.tasks = data['Result'];
           this.cargados = data['Result'].length;
           this.abiertos = data['Result'].filter(t => t.Status === 'Abierto').length;
           this.cerrados = data['Result'].filter(t => t.Status === 'Cerrado').length;
           this.dtTrigger.next();
           this.dtTrigger.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

   getWeekNumberNonISO(d) {
    // Create UTC equivalent for 23:59:59.999 on the passed in date
    var sat: any = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),23,59,59,999));
    // Set to Saturday at end of week
    sat.setUTCDate(sat.getUTCDate() + 6 - sat.getUTCDay());
    // Get first day of year
    var firstDay: any = new Date(Date.UTC(sat.getUTCFullYear(), 0, 1));
    // Set to Sunday on or before, i.e. first day of first week in year
    firstDay = firstDay.setUTCDate(firstDay.getUTCDate() - firstDay.getUTCDay());
    // Week number is difference in dates divided by ms/week rounded
    return Math.round((sat - firstDay)/(6.048e8));
  }

  viewImage(content, srcimage, idTask){
    this.dataimage = srcimage;
    this.idTask = idTask;
    this.modalService.open(content, { size: 'lg' });
  }

  getWeeks(){
    this.TaskInfo.getWeeks().subscribe((data: any) => {
      if(data['Error'] != true){
         this.weeks =  data['Result'];
      }
    });
  }

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


  changeWeek(week){
    this.week = week;
    this.getAllTask(this.week, this.priority, this.status);
  }

  changePrority(priority){
    this.priority = priority == "All" ? ['A','B','C'] : [priority];
    this.getAllTask(this.week, this.priority, this.status);
  }

  changeStatus(status){
    this.status = status == "All" ? ['Abierto','Cerrado']: [status];
    this.getAllTask(this.week, this.priority, this.status);
  }



  updateComment(comment, idTask){
    this.newTask = new Task();
    this.newTask.IdTask = idTask;
    this.newTask.Comments = comment.value;
    this.TaskInfo.updateComment(this.newTask).subscribe((data: any) => {
      if(data['Error'] != true){
        Swal.fire({
          title: 'Success!!',
          text: 'Se modificó correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
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

  updateStatus(status, idTask){
    var newStatus= false;
    status.textContent.trim() == "Abierto" ? newStatus = false :  status.textContent.trim() == "Cerrado" ? newStatus = true : newStatus = false;
    this.newTask = new Task();
    this.newTask.IdTask = idTask;
    this.newTask.Status = newStatus;
    this.TaskInfo.updateStatus(this.newTask).subscribe((data: any) => {
      if(data['Error'] != true){
        Swal.fire({
          title: 'Success!!',
          text: 'Se modificó correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getAllTask(this.week, this.priority, this.status);
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

  updateImage(){
    this.newTask = new Task();
    this.newTask.IdTask = this.idTask;
    this.newTask.Image =this.dataimage;
    console.log(this.newTask);
    this.TaskInfo.updateImage(this.newTask).subscribe((data: any) => {
      if(data['Error'] != true){
        Swal.fire({
          title: 'Success!!',
          text: 'Se modificó correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getAllTask(this.week, this.priority, this.status);
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

  updateDueDate(dueDate, idTask){
    this.newTask = new Task();
    this.newTask.IdTask = idTask;
    this.newTask.DueDate = dueDate.value;
    this.TaskInfo.updateDueDate(this.newTask).subscribe((data: any) => {
      if(data['Error'] != true){
        Swal.fire({
          title: 'Success!!',
          text: 'Se modificó correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getAllTask(this.week, this.priority, this.status);
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

  deleteTask(idTask){
    Swal.fire({
      title: 'Estás seguro?',
      text: "No será posible revertir el cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
            this.TaskInfo.deleteTask(idTask).subscribe((data: any) => {
                  if(data['Error'] != true){
                    Swal.fire({
                      title: 'Success!!',
                      text: 'Se elimino correctamente',
                      icon: 'success',
                      confirmButtonText: 'OK'
                    });
                    this.getAllTask(this.week, this.priority, this.status);
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
    })
  }




  loadTable(){


    this.dtOptions = {
      dom: 'Bfrt',
      searching: false,
      paging: false,
      // Configure the buttons
      buttons: [
        {
          extend: 'excel',
          exportOptions: {
            columns: [ 0, 1,2,3,4 ,5,6,7]
          }
        },
        {
          extend: 'print', 
          exportOptions: {
          columns: [ 0, 1,2,3,4 ,5,6,7]
        }
      },
        {
          extend: 'copy',
          exportOptions: {
            columns: [ 0, 1,2,3,4 ,5,6,7]
          }
        }
      ],
      initComplete: function () {
        var btns = $('.dt-button');
        btns.addClass('btn float-right btn-primary btn-sm mb-3');
        btns.removeClass('dt-button');
        }
    };
  }



  
}