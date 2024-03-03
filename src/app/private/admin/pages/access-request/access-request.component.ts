import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Request } from 'src/app/models/Request';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { RegisterRequest } from 'src/app/models/RegisterRequest';
import { RegisterRequestService } from '../../services/register-request.service';
import { AlertHandler } from 'src/app/utils/AlertHandler';

@Component({
  selector: 'app-access-request',
  templateUrl: './access-request.component.html',
  styleUrls: ['./access-request.component.scss']
})
export class AccessRequestComponent {

  
  displayedColumns: string[] = [
    'dateRequest',
    'requesterName',
    'requesterLastname',
    'requesterEmail',
    'status',
    'actions'
  ];

  dataSource!: MatTableDataSource<RegisterRequest>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listRequest!: RegisterRequest[];
  successAccepted: boolean = false;
  successDenied: boolean = false;

  alertType!: string;
  messageAlert!: string;

  constructor(
    private registerRequestService: RegisterRequestService
  ) {  
  }

  ngOnInit(): void {
    this.registerRequestService.getAll().subscribe((requests) => {
      console.log(requests)
      this.listRequest = requests
      this.dataSource = new MatTableDataSource(this.listRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }
  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAccept(row: RegisterRequest) {
    this.registerRequestService.approve_reject(true, row.idRegisterRequest).subscribe((response) => {
      console.log(response);

      AlertHandler.show('Se ha aceptado la solicitud exitosamente', AlertType.SUCCESS);
        this.ngOnInit();
      },
      (error) =>{
        console.log(error);
        AlertHandler.show('Ha ocurrido un error al aceptar la solicitud', AlertType.ERROR);
      })
  }

  onDenied(row: RegisterRequest){
    this.registerRequestService.approve_reject(false, row.idRegisterRequest).subscribe((response) => {
      console.log(response);

      AlertHandler.show('Se ha rechazado la solicitud exitosamente', AlertType.SUCCESS);
        this.ngOnInit();
      }
      ,
      (error) =>{
        console.log(error);
        AlertHandler.show('Ha ocurrido un error al rechazar la solicitud', AlertType.ERROR);
      })
  }
}
