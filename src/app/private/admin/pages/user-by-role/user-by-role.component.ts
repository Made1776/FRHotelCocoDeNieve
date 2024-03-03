import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/private/services/users.service';
import { RolService } from '../../services/rol.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRolService } from '../../services/user-rol.service';
import { RolUser } from 'src/app/models/RolUser';
import { MatStepper } from '@angular/material/stepper';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { RolUserId } from 'src/app/models/RolUserId';

@Component({
  selector: 'app-user-by-role',
  templateUrl: './user-by-role.component.html',
  styleUrls: ['./user-by-role.component.scss']
})
export class UserByRoleComponent {

  @ViewChild('stepper') stepper!: MatStepper;

  displayedColumns: string[] = [
    'assigned',
    'role',
    'description'
  ];

  dataSource!: MatTableDataSource<Role>;

  listRole!: Role[];
  listUser!: User[];
  userRoleForm: FormGroup;
  selectedRow: any;
  selectedRows: number[] = [];
  userName!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private rolService: RolService,
    private userService: UsersService,
    private rolUserService: UserRolService
  ) {
    this.userRoleForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.listUsers();
    this.buildForm();
  }

  listUsers(){
    this.userService.getAll().subscribe(users => {
      this.listUser = users;
    });
  }

  listRolesByUser(idUser: number){
    this.rolUserService.listByIdUser(idUser).subscribe(roles => {
      if(roles.length == 0 ){
        this.selectedRows = [];
      }
      else{
        roles.forEach(role => {
          this.selectedRows.push(role.rolUserId.idRol);
        })
      }
    }, error => {
      console.log(error);
      AlertHandler.show('No se ha podido obtener los roles del usuario seleccionado, inténtelo nuevamente', AlertType.ERROR)
    });
  }

  buildForm(){
    this.userRoleForm = this._formBuilder.group({
      user: ['', Validators.required]
    });
  }

  onUserChange(event: any) {
    this.userName = this.listUser.find(user=>user.idUser == event.value)?.personalData.name! + ' ' + this.listUser.find(user=>user.idUser == event.value)?.personalData.lastname;
    this.selectedRows = [];
  }

  onNext(){
    this.listRoles();
    this.listRolesByUser(this.userRoleForm.get('user')?.value);
  }

  listRoles(){
    this.rolService.getAll().subscribe(roles => {
      this.listRole = roles;
      this.dataSource = new MatTableDataSource(this.listRole);
    });
  }

  // Método para manejar la selección de una fila
  toggleRowSelection(idRole: number) {
    if (this.isSelected(idRole)) {
      // Si el índice ya está seleccionado, quítalo de la lista
      this.selectedRows = this.selectedRows.filter(selectedIndex => selectedIndex !== idRole);
    } else {
      // Si el índice no está seleccionado, agrégalo a la lista
      this.selectedRows.push(idRole);
    }
  }

  // Método para verificar si un índice está seleccionado
  isSelected(idRole: number): boolean {
    return this.selectedRows.includes(idRole);
  }

  buildUserRol(): RolUser[] {
    const rolUserList: RolUser[] = [];
    this.selectedRows.forEach(idRole => {
      const rolUser: RolUser = {
        rolUserId:{
          idRol: idRole,
          idUser: this.userRoleForm.get('user')?.value
        }
      };
      rolUserList.push(rolUser);
    });
    return rolUserList;
  }

  onSave(){
    this.rolUserService.saveList(this.buildUserRol(), this.userRoleForm.get('user')?.value).subscribe({
      next: () => {

        AlertHandler.show('Se ha asignado los roles al usuario, correctamente', AlertType.SUCCESS)
        this.selectedRows = [];
        this.stepper.reset();
      },
      error: (error) => {
        console.log(error);
        AlertHandler.show('No se ha podido asignar los roles al usuario seleccionado, inténtelo nuevamente', AlertType.ERROR)
      }
    });
  }


  onEdit(row: Request) {

  }

  onBack() {

  }
}