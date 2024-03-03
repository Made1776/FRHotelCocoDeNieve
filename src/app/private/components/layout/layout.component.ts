import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {NavComponent} from "../nav/nav.component";
import {CommonModule, UpperCasePipe} from "@angular/common";
import {MenuRolService} from '../../admin/services/menu-rol.service';
import {UserRolService} from '../../admin/services/user-rol.service';
import {UsersService} from '../../services/users.service';
import {User} from 'src/app/models/User';
import {MenuService} from '../../admin/services/menu.service';
import {Menu} from 'src/app/models/Menu';
import {forkJoin, of, switchMap} from 'rxjs';
import {AlertHandler} from "../../../utils/AlertHandler";
import {AlertType} from "../../../models/Enums/AlertType.enum";
import {MenuRol} from "../../../models/MenuRol";
import {RolUser} from "../../../models/RolUser";

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    NavComponent,
    UpperCasePipe,
    CommonModule,
  ],
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: User | null = null;
  listMenus: Menu[] = [];
  isAdmin: boolean = false;
  submenus: Menu[] = [];

  constructor(
    private usersService: UsersService,
    private rolUserService: UserRolService,
    private menuRolService: MenuRolService,
    private menuService: MenuService
  ) {
  }

  ngOnInit() {
    this.usersService.user$
      .pipe(
        switchMap(user => this.handleUserUpdate(user)),
        switchMap(roles => this.handleRoles(roles)),
        switchMap(menuRoles => this.handleMenuRoles(menuRoles))
      )
      .subscribe({
        next: menus => {
          this.isAdmin = true;
          this.listMenus = menus;
          this.listMenus.sort((a, b) => a.order - b.order);

          const userMenu = this.listMenus.find(menu =>
            menu.label.toLowerCase() === 'Menú de usuario'.toLowerCase()
          );
        
          if (userMenu) {
            this.isAdmin = false;
            this.listSubmenus(userMenu.idMenu);
          }
        },
        error: err => {
          console.error(err);
          AlertHandler.show('No se pudo cargar el menú', AlertType.ERROR);
        }
      })
  }

  private handleUserUpdate(user: User | null) {
    if (!user) {
      return of([]);
    }

    return this.rolUserService.listByIdUser(user.idUser!);
  }

  private handleRoles(roles: RolUser[]) {
    const roleId = roles[0]?.rolUserId.idRol;
    if (!roleId) {
      return of([]);
    }

    return this.menuRolService.getById(roleId);
  }

  private handleMenuRoles(menuRoles: MenuRol[]) {
    const getMenuObservables = menuRoles.map(({menuRolId}) =>
      this.menuService.getMenuById(menuRolId.idMenu)
    );

    return forkJoin(getMenuObservables);
  }

  listSubmenus(idMenu: number){
    this.menuService.getAllByMenuParent(idMenu).subscribe(submenu => {
      this.submenus.push(...submenu);
      this.submenus.sort((a, b) => a.order - b.order);
    });
  }

  filterByParent(idMenu: number) : Menu[]{
    return this.submenus.filter(submenu => submenu.parentMenu === idMenu);
  }

}
