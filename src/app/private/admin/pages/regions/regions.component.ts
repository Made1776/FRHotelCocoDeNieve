import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Region } from 'src/app/models/Region';
import { RegionService } from '../../services/region.service';
import { ModalRegionComponent } from './modal-region/modal-region.component';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent {

  displayedColumns: string[] = [
    'region',
    'actions'
  ];

  dataSource!: MatTableDataSource<Region>;

  listRegions!: Region[];

  constructor(
    private modalService: MdbModalService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.regionService.getAll().subscribe((region) => {
      this.listRegions = region;
      this.dataSource = new MatTableDataSource(this.listRegions);
    },
    (error) => {
      console.log(error);
    });
  }

  onSave() {
    const modalRef: MdbModalRef<ModalRegionComponent> = this.modalService.open(ModalRegionComponent, {
      data: {
        title: 'Nueva Región'
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

  onEdit(row: Region) {
    const modalRef: MdbModalRef<ModalRegionComponent> = this.modalService.open(ModalRegionComponent, {
      data: {
        title: 'Edición Región',
        isEditing: true,
        region: row
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

  onDelete(row: Region){
    const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
      data: {
        data: {
          title: '¿Estás seguro que deseas eliminar esta región?'
        }
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){ //if the user confirmed
        this.regionService.delete(row.idRegion).subscribe({
          next: () => {
              AlertHandler.show('Se ha eliminado la región exitosamente', AlertType.SUCCESS)
              this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
              AlertHandler.show('No se pudo eliminar la región', AlertType.ERROR)
              AlertHandler.show('Existen recursos relacionados con la región', AlertType.INFO)
              this.ngOnInit();
          }
        })
      }
    });
  }
}
