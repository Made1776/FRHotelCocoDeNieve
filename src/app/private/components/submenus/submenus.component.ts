import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MenuService } from '../../admin/services/menu.service';
import { Menu } from 'src/app/models/Menu';

@Component({
  selector: 'app-submenus',
  standalone: true,
  templateUrl: './submenus.component.html',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ],
  styleUrls: ['./submenus.component.scss']
})
export class SubmenusComponent implements OnInit{

  colores: string[] = [];
  submenus: Menu[] = [];
  parentMenu: Menu = {} as Menu;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idMenuParent = params['id'];
      this.getMenuParentById(idMenuParent);
    });
  }

  generateRandomColors(): void {
    this.colores = this.submenus.map(() => this.getRandomColor());
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDE';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  getMenuParentById(idMenu: number){
    this.menuService.getMenuById(idMenu).subscribe(menu => {
      this.parentMenu = menu;
      this.listSubmenus(idMenu);
    });
  }

  listSubmenus(idMenu: number){
    this.menuService.getAllByMenuParent(idMenu).subscribe(submenu => {
      this.submenus = submenu;
      this.submenus.sort((a, b) => a.order - b.order);
      this.generateRandomColors();
    });
  }
}
