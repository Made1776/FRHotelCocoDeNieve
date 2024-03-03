import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Region } from 'src/app/models/Region';
import { RegionService } from '../../../services/region.service';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';

@Component({
  selector: 'app-modal-region',
  templateUrl: './modal-region.component.html',
  styleUrls: ['./modal-region.component.scss']
})
export class ModalRegionComponent implements OnInit {
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() region!: Region;

  regionForm: FormGroup;

  constructor(
    public modalRef: MdbModalRef<ModalRegionComponent>,
    private fb: FormBuilder,
    private regionService: RegionService
  ) {
    this.regionForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    if (this.isEditing) {
      this.setForm();
    }
  }

  buildForm() {
    this.regionForm = this.fb.group({
      region_name: ['', Validators.required]
    });
  }

  get rolNameField() {
    return this.regionForm.get('region_name');
  }

  setForm() {
    this.regionForm.patchValue({
      region_name: this.region.name
    });
  }

  onClose(): void {
    const state = true;
    this.modalRef.close(state);
  }

  buildRegion(): Region {
    const region: Region = {
      idRegion: this.isEditing ? this.region.idRegion : 0,
      name: this.regionForm.get('region_name')?.value
    };
    return region;
  }

  onSave() {
    if (this.isEditing) {
      this.regionService.update(this.region.idRegion, this.buildRegion()).subscribe((region) => {
        this.onClose();
        AlertHandler.show('Se ha modificado la región exitosamente', AlertType.SUCCESS)
      },
      (error) => {
        console.log(error);
        this.onClose();
        AlertHandler.show('No se pudo modificar la región, inténtelo nuevamente', AlertType.ERROR)
      });

    } else {
      this.regionService.save(this.buildRegion()).subscribe((region) => {
        this.onClose();
        AlertHandler.show('Se ha creado una nueva región exitosamente', AlertType.SUCCESS)
      },
      (error) => {
        console.log(error);
        this.onClose();
        AlertHandler.show('No se pudo crear la región, inténtelo nuevamente', AlertType.ERROR)
      });
    }
  }
}
