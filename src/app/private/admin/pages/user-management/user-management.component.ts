import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/private/services/users.service';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {

  displayedColumns: string[] = [
    'name',
    'lastname',
    'email',
    'status',
    'actions'
  ];

  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listUsers!: User[];

  constructor(
    private userService: UsersService,
    private modalService: MdbModalService,
  ) {}

  ngOnInit(): void {
    this.listUser();
  }

  listUser(){
    this.userService.getAll().subscribe(users => {
      this.listUsers = users;
      this.dataSource = new MatTableDataSource(this.listUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filteredUsers = this.listUsers.filter(user => {
      const personalData = user.personalData;
      return (
        personalData.name.toLowerCase().includes(filterValue) ||
        personalData.lastname.toLowerCase().includes(filterValue) ||
        personalData.email.toLowerCase().includes(filterValue)
      );
    });
    this.dataSource = new MatTableDataSource(filteredUsers);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEnable(user: User) {
    const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
      data: {
        data: {
          title: '¿Estás seguro que deseas habilitar al usuario?',
          isFormVisible: false
        }
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){ //if the user confirmed
        this.userService.updateNotLocked(user.username, true).subscribe({
          next: () => {
            AlertHandler.show('Se ha habilitado el usuario exitosamente', AlertType.SUCCESS)
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
            AlertHandler.show('No se ha podido habilitar el usuario, inténtelo nuevamente', AlertType.ERROR)
          }
        });
      }
    });
  }

  onDisable(user: User) {
    const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
      data: {
        data: {
          title: '¿Estás seguro que deseas deshabilitar al usuario?',
          isFormVisible: true
        }
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){ //if the user confirmed
        this.userService.updateNotLocked(user.username, false).subscribe({
          next: () => {
            AlertHandler.show('Se ha deshabilitado el usuario exitosamente', AlertType.SUCCESS)
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
            AlertHandler.show('No se ha podido deshabilitar el usuario, inténtelo nuevamente', AlertType.ERROR)
          }
        });
      }
    });
  }

  onDelete(user: User) {
    const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
      data: {
        data: {
          title: '¿Estás seguro que deseas eliminar al usuario?'
        }
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){ //if the user confirmed
        // this.menuService.delete(menu.idMenu).subscribe({
        //   next: () => {
            AlertHandler.show('Se ha eliminado el usuario exitosamente', AlertType.SUCCESS)
            this.ngOnInit();
        //   },
        //   error: (error) => {
        //     console.log(error);
        //     AlertHandler.show('No se ha podido eliminar el menú, inténtelo nuevamente', AlertType.ERROR)
        //   }
        // });
      }
    });
  }
}