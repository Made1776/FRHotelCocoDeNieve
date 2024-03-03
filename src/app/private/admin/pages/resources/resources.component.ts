import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalResourceComponent } from './modal-resource/modal-resource.component';
import { Resource } from 'src/app/models/Resource';
import { ModalImageResourceComponent } from './modal-image-resource/modal-image-resource.component';
import { ResourceService } from '../../services/resource.service';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  displayedColumns: string[] = [
    'nameResource',
    'description',
    'typeResource',
    'region',
    'place',
    'address',
    'floor',
    'codeNumber',
    'capacity',
    'price',
    'image',
    'actions'
  ];

  dataSource!: MatTableDataSource<Resource>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listResources!: Resource[];

  constructor(
    private resourceService: ResourceService,
    private modalService: MdbModalService
  ) {  }

  ngOnInit(): void {
    this.resourceService.getAll().subscribe((resources) => {
      this.listResources = resources
      this.dataSource = new MatTableDataSource(this.listResources);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (error) =>{
      console.log(error);
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const lowerCaseFilter = filterValue.trim().toLowerCase();

    // Filtrar por todos los campos que deseas, incluyendo idTypeResource e idLocation
    this.dataSource.filterPredicate = (data: Resource, filter: string) => {
      const textToSearch = `${data.codNumber} ${data.name} ${data.description}
                            ${data.idTypeResource.name} ${data.capacity} ${data.price}
                            ${data.idLocation.place} ${data.idLocation.address} ${data.idLocation.floor} ${data.idLocation.idRegion.name}`;
      return textToSearch.toLowerCase().includes(filter);
    };

    // Aplicar el filtro
    this.dataSource.filter = lowerCaseFilter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createResource() {
    const modalRef: MdbModalRef<ModalResourceComponent> = this.modalService.open(ModalResourceComponent, {
      data: {  title: 'Nuevo Recurso' },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){
        this.ngOnInit();
      }
    });
  }

  seeImage(path: string | null, title: string | null){
    const modalRef: MdbModalRef<ModalImageResourceComponent> = this.modalService.open(ModalImageResourceComponent, {
      data: {
          imageUrl: path,
          imageTitle: title
        },
      modalClass: 'modal-dialog-centered',
      });
  }

  editResource(row: Resource) {
    const modalRef: MdbModalRef<ModalResourceComponent> = this.modalService.open(ModalResourceComponent, {
      data: {
        title: 'Edición Recurso',
        isEditing: true,
        resource: row
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

  deleteResource(row: Resource){
    const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
      data: {
        data: {
          title: '¿Estás seguro que deseas eliminar este recurso?'
        }
      },
      modalClass: 'modal-dialog-centered',
      ignoreBackdropClick: true,

    });

    modalRef.onClose.subscribe((state: boolean) => {
      if(state){ //if the user confirmed
        this.resourceService.delete(row.idResource).subscribe((response) => {
          console.log(response);
          AlertHandler.show('Se ha eliminado el recurso exitosamente', AlertType.SUCCESS)
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        },
        (error) =>{
          console.log(error);
          AlertHandler.show('No se pudo eliminar el recurso, inténtelo nuevamente', AlertType.ERROR)
        })
      }
    });
  }
}
