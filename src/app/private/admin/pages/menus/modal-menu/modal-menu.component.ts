import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { Menu } from 'src/app/models/Menu';
import { MenuService } from '../../../services/menu.service';
import { AlertHandler } from 'src/app/utils/AlertHandler';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styleUrls: ['./modal-menu.component.scss']
})
export class ModalMenuComponent implements OnInit {
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() menu!: Menu;
  @Input() levelMenu!: number;
  @Input() idParentMenu!: number;

  menuForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<ModalMenuComponent>,
    private fb: FormBuilder,
    private menuService: MenuService,
  ) {
    this.menuForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  buildForm() {
    this.menuForm = this.fb.group({
      label: ['', Validators.required],
      order: ['', Validators.required],
      url: [''],
      icon: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get labelField() {
    return this.menuForm.get('label');
  }

  get oderField() {
    return this.menuForm.get('order');
  }

  get descriptionField() {
    return this.menuForm.get('description');
  }

  setForm() {
    this.menuForm.patchValue({
      label: this.menu.label,
      order: this.menu.order,
      url: this.menu.path,
      icon: this.menu.icon,
      description: this.menu.description
    });
  }

  onClose(): void {
    const state = true;
    this.modalRef.close(state);
  }

  buildMenu(): Menu {
    const menu: Menu = {
      idMenu: this.isEditing ? this.menu.idMenu : 0,
      label: this.menuForm.value.label,
      parentMenu: this.isEditing ? this.menu.parentMenu : this.idParentMenu,
      order: parseInt(this.menuForm.value.order),
      path: this.menuForm.value.url,
      description: this.menuForm.value.description,
      icon: this.menuForm.value.icon,
      permisos: ''
    };
    return menu;
  }

  onSave() {
    if (this.isEditing) {
      this.menuService.update(this.buildMenu(), this.menu.idMenu).subscribe((menu) => {

          AlertHandler.show('Se ha modificado el menú exitosamente', AlertType.SUCCESS)
          this.onClose();
      },
      (error) => {
        console.log(error);
          AlertHandler.show('Error, no se pudo modificar el menú, inténtelo nuevamente', AlertType.ERROR)
          this.onClose();
      });

    } else {
      this.menuService.save(this.buildMenu()).subscribe((menu) => {
          AlertHandler.show('Se ha creado un nuevo menú exitosamente', AlertType.SUCCESS)
          this.onClose();
      },
      (error) => {
        console.log(error);
          AlertHandler.show('Error, no se pudo crear el menu, inténtelo nuevamente', AlertType.ERROR)
          this.onClose();
      });
    }
  }
}
