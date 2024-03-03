import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/app/models/Menu';
import { ModalMenuComponent } from './modal-menu/modal-menu.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MenuService } from '../../services/menu.service';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { ConfirmationDialogComponent } from 'src/app/utils/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit{

  firstTableColumns: string[] = [
    'select',
    'label',
    'order',
    'description',
    'icon',
    'action'
  ];

  secondTableColumns: string[] = [
    'label',
    'order',
    'description',
    'icon',
    'action'
  ];

  firstTable!: MatTableDataSource<Menu>;
  secondTable!: MatTableDataSource<Menu>;

  listFirstLevelMenu: Menu[] = [];
  listSecondLevelMenu: Menu[] = [];

  selectedRow: any;
  isFirstLevelSelected: boolean = false;
  parentMenu!: Menu;
  // alertType: any;
  // messageAlert!: string;
  // isSuccessDelete: boolean = false;

  constructor(
    private modalService: MdbModalService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getAllFirstLevel().subscribe((firstLevelMenu) =>{
      this.listFirstLevelMenu = firstLevelMenu;
      this.firstTable = new MatTableDataSource(this.listFirstLevelMenu);
    },
    (error) => {
      console.log(error);
    });
  }

  // first lavel menu selection
  public onSelectRow(menu: Menu, level: number): void {
    if (level === 1) {
      this.isFirstLevelSelected = true;
      this.parentMenu = menu;

      this.listSecondLevelMenu = [];
      this.getChildrenMenu(menu.idMenu);
    } else{
      this.isFirstLevelSelected = false;
    }
  }

  getChildrenMenu(idParentMenu: number): void {
    this.menuService.getAllByMenuParent(idParentMenu).subscribe((childrenMenu) => {
      this.listSecondLevelMenu = childrenMenu;
      this.secondTable = new MatTableDataSource(this.listSecondLevelMenu);
    },
    (error) => {
      console.log(error);
    });
  }

  onCreate(level: number) {

    if(level === 1){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Nuevo Menú de Primer Nivel',
          levelMenu: level,
          idParentMenu: null
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,

      });

      modalRef.onClose.subscribe((state: boolean) => {
        if(state){
          this.ngOnInit();
        }
      });

    }else if(level === 2){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Nuevo Menú de Segundo Nivel',
          levelMenu: level,
          idParentMenu: this.parentMenu.idMenu

        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,

      });

      modalRef.onClose.subscribe((state: boolean) => {
        if(state){
          this.getChildrenMenu(this.parentMenu.idMenu);
        }
      });
    }

  }

  onEdit(level: number, menu: Menu) {

    if(level === 1){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Edición Menú de Primer Nivel',
          isEditing: true,
          menu: menu,
          levelMenu: level
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,

      });

      modalRef.onClose.subscribe((state: boolean) => {
        if(state){
          this.ngOnInit();
        }
      });

    }else if(level === 2){
      const modalRef: MdbModalRef<ModalMenuComponent> = this.modalService.open(ModalMenuComponent, {
        data: {
          title: 'Edición Menú de Segundo Nivel',
          isEditing: true,
          menu: menu,
          levelMenu: level
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,

      });

      modalRef.onClose.subscribe((state: boolean) => {
        if(state){
          this.getChildrenMenu(menu.parentMenu);
        }
      });
    }
  }

  onDelete(level: number, menu: Menu) {
    if(level === 1){
      const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
        data: {
          data: {
            title: '¿Estás seguro que deseas eliminar este menú?'
          }
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
  
      });
  
      modalRef.onClose.subscribe((state: boolean) => {
        if(state){ //if the user confirmed
          this.menuService.delete(menu.idMenu).subscribe({
            next: () => {
              AlertHandler.show('Se ha eliminado el menú exitosamente', AlertType.SUCCESS)
              this.ngOnInit();
            },
            error: (error) => {
              console.log(error);
              AlertHandler.show('No se ha podido eliminar el menú, inténtelo nuevamente', AlertType.ERROR)
            }
          });
        }
      });

    }else if(level === 2){
      const modalRef: MdbModalRef<ConfirmationDialogComponent> = this.modalService.open(ConfirmationDialogComponent, {
        data: {
          data: {
            title: '¿Estás seguro que deseas eliminar este submenú?'
          }
        },
        modalClass: 'modal-dialog-centered',
        ignoreBackdropClick: true,
  
      });
  
      modalRef.onClose.subscribe((state: boolean) => {
        if(state){ //if the user confirmed
          this.menuService.delete(menu.idMenu).subscribe({
            next: () => {
              AlertHandler.show('Se ha eliminado el submenú exitosamente', AlertType.SUCCESS)
              this.getChildrenMenu(menu.parentMenu);
            },
            error: (error) => {
              console.log(error);
              AlertHandler.show('No se ha podido eliminar el submenú, inténtelo nuevamente', AlertType.ERROR)
            }
          });
        }
      });
    }
    
  }
}
