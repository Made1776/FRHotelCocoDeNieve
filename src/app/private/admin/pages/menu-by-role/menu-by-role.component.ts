import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MenuRol } from 'src/app/models/MenuRol';
import { Role } from 'src/app/models/Role';
import { RolService } from '../../services/rol.service';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from '../../services/menu.service';
import { MenuRolService } from '../../services/menu-rol.service';
import { MatStepper } from '@angular/material/stepper';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';

@Component({
  selector: 'app-menu-by-role',
  templateUrl: './menu-by-role.component.html',
  styleUrls: ['./menu-by-role.component.scss']
})
export class MenuByRoleComponent {

  @ViewChild('stepper') stepper!: MatStepper;

  displayedColumns: string[] = [
    'assigned',
    'menu',
    'description'
  ];

  dataSource!: MatTableDataSource<Menu>;

  listMenu!: Menu[];
  listRol!: Role[];
  menuRoleForm: FormGroup;
  selectedRow: any;
  selectedRows: number[] = [];
  rolName!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private rolService: RolService,
    private menuService: MenuService,
    private menuRolService: MenuRolService
  ) {
    this.menuRoleForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.listRoles();
    this.buildForm();
  }

  listRoles(){
    this.rolService.getAll().subscribe(rols => {
      this.listRol = rols;
    });
  }

  listRolesByUser(idRol: number){
    this.menuRolService.getById(idRol).subscribe(rols => {
      if(rols.length == 0 ){
        this.selectedRows = [];
      }else{
        rols.forEach(rol => {
          this.selectedRows.push(rol.menuRolId.idMenu);
        })
      }
    });
  }

  buildForm(){
    this.menuRoleForm = this._formBuilder.group({
      rol: ['', Validators.required]
    });
  }

  onRolChange(event: any) {
    this.rolName = this.listRol.find(rol=>rol.idRol == event.value)?.nombre!;
    this.selectedRows = [];
  }

  onNext(){
    this.listMenus();
    this.listRolesByUser(this.menuRoleForm.get('rol')?.value);
  }

  listMenus(){
    this.menuService.getAllFirstLevel().subscribe(menus => {
      this.listMenu = menus;
      this.dataSource = new MatTableDataSource(this.listMenu);
    });
  }

  // Método para manejar la selección de una fila
  toggleRowSelection(idMenu: number) {
    if (this.isSelected(idMenu)) {
      // Si el índice ya está seleccionado, quítalo de la lista
      this.selectedRows = this.selectedRows.filter(selectedIndex => selectedIndex !== idMenu);
    } else {
      // Si el índice no está seleccionado, agrégalo a la lista
      this.selectedRows.push(idMenu);
    }
  }

  // Método para verificar si un índice está seleccionado
  isSelected(idMenu: number): boolean {
    return this.selectedRows.includes(idMenu);
  }

  buildMenuRol(): MenuRol[] {
    const menuRolList: MenuRol[] = [];
    this.selectedRows.forEach(idMenu => {
      const menuRol: MenuRol = {
        menuRolId: {
          idMenu: idMenu,
          idRol: this.menuRoleForm.get('rol')?.value
        },
        permissions: ''
      };
      menuRolList.push(menuRol);
    });
    return menuRolList;
  }

  onSave(){
    this.menuRolService.saveList(this.buildMenuRol()).subscribe({
      next: () => {

        AlertHandler.show('Se ha asignado los menus al rol, correctamente', AlertType.SUCCESS)
        this.selectedRows = [];
        this.stepper.reset();
      },
      error: (error) => {
        console.log(error);
        AlertHandler.show('No se ha podido asignar los menus al rol seleccionado, inténtelo nuevamente', AlertType.ERROR)
      }
    });


  }


  onEdit(row: Request) {

  }

  onBack() {

  }
}
