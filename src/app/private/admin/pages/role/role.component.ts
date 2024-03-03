import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalRoleComponent } from './modal-role/modal-role.component';
import { Role } from 'src/app/models/Role';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { RolService } from '../../services/rol.service';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {


  displayedColumns: string[] = [
    'role',
    'description',
    'actions'
  ];

  dataSource!: MatTableDataSource<Role>;

  listRoles!: Role[];

  constructor(
    private modalService: MdbModalService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.rolService.getAll().subscribe((roles) => {
      this.listRoles = roles;
      this.dataSource = new MatTableDataSource(this.listRoles);
    },
    (error) => {
      console.log(error);
    });
  }

  onSave() {
    const modalRef: MdbModalRef<ModalRoleComponent> = this.modalService.open(ModalRoleComponent, {
      data: {
        title: 'Nuevo Rol'
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){
        this.ngOnInit();
      }
    });
  }

  onEdit(row: Role) {
    const modalRef: MdbModalRef<ModalRoleComponent> = this.modalService.open(ModalRoleComponent, {
      data: {
        title: 'Edición Rol',
        isEditing: true,
        rol: row
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){
        this.ngOnInit();
      }
    });
  }

  onDelete(row: Role){
    const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
      data: {
        data: {
          title: '¿Estás seguro que deseas eliminar este rol?'
        }
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){ //if the user confirmed
        this.rolService.delete(row.idRol).subscribe({
          next: () => {
              AlertHandler.show('Se ha eliminado el rol exitosamente', AlertType.SUCCESS)
              this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
              AlertHandler.show('No se pudo eliminar el rol, inténtelo nuevamente', AlertType.ERROR)
          }
        })
      }
    });
  }
}
