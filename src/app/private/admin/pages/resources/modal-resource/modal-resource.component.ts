import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { LocationCreate } from 'src/app/models/LocationCreate';
import { Region } from 'src/app/models/Region';
import { Resource } from 'src/app/models/Resource';
import { ResourceCreate } from 'src/app/models/ResourceCreate';
import { ResourceType } from 'src/app/models/ResourceType';
import { ResourceTypeService } from '../../../services/resource-type.service';
import { RegionService } from '../../../services/region.service';
import { ResourceService } from '../../../services/resource.service';
import { Location } from 'src/app/models/Location';
import { AlertType } from 'src/app/models/Enums/AlertType.enum';
import { AlertHandler } from 'src/app/utils/AlertHandler';
import { TypeResource } from 'src/app/models/TypeResource';

@Component({
  selector: 'app-modal-resource',
  templateUrl: './modal-resource.component.html',
  styleUrls: ['./modal-resource.component.scss'],
})
export class ModalResourceComponent implements OnInit, AfterViewInit {
  @Input() isEditing = false;
  @Input() title!: string;
  @Input() resource!: Resource;

  resourceForm: FormGroup;
  selectedFile: any;
  isNewImage = false;
  validExtension: boolean = true;
  listRegions: Region[] = []
  listTypeResources: ResourceType[] = []
  pathImage: any;
  selectedFileName!: string;

  constructor(
    public modalRef: MdbModalRef<ModalResourceComponent>,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private typeResourceService: ResourceTypeService,
    private regionService: RegionService,
    private resourceService: ResourceService,
  ) {
    this.resourceForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.getTypeResource();
    this.getRegions();
    if (this.isEditing) {
      this.setForm();
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  buildForm() {
    this.resourceForm = this.fb.group({
      idTypeResource: [null, [Validators.required]],
      idRegion: [null, [Validators.required]],
      place: ['', [Validators.required]],
      address: ['', [Validators.required]],
      floor: ['', [Validators.required]],
      capacity: [1],
      codNumber: ['', [Validators.required]],
      price: ['', [Validators.required]],
      pathImages: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  get idTypeResourceField() {
    return this.resourceForm.get('idTypeResource');
  }

  get idRegionField() {
    return this.resourceForm.get('idRegion');
  }

  get placeField() {
    return this.resourceForm.get('place');
  }

  get addressField() {
    return this.resourceForm.get('address');
  }

  get floorField() {
    return this.resourceForm.get('floor');
  }

  get capacityField() {
    return this.resourceForm.get('capacity');
  }

  get codNumberField() {
    return this.resourceForm.get('codNumber');
  }

  get priceField() {
    return this.resourceForm.get('price');
  }

  get pathImagesField() {
    return this.resourceForm.get('pathImages');
  }

  get nameField() {
    return this.resourceForm.get('name');
  }

  get descriptionField() {
    return this.resourceForm.get('description');
  }

  getTypeResource() {
    this.typeResourceService.getAll().subscribe((typeResource) => {
      this.listTypeResources = typeResource;
    })
  }

  getRegions() {
    this.regionService.getAll().subscribe((region) => {
      this.listRegions = region;
    })
  }

  setForm() {

    this.resourceForm.patchValue({
      idTypeResource: this.resource.idTypeResource.idTypeResource,
      idRegion: this.resource.idLocation.idRegion.idRegion,
      place: this.resource.idLocation.place,
      address: this.resource.idLocation.address,
      floor: this.resource.idLocation.floor,
      capacity: this.resource.capacity ? this.resource.capacity : 0,
      codNumber: this.resource.codNumber,
      price: this.resource.price ? this.resource.price : 0,
      pathImages: this.resource.pathImages,
      name: this.resource.name,
      description: this.resource.description
    });
    this.selectedFile = this.resource.pathImages;
    this.selectedFileName = this.resource?.pathImages?.split('/').pop()!;

  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // get the file extension
      const fileExtension = file.name.split('.').pop().toLowerCase();

      // Check if the extension is for an image
      if (!['png', 'jpeg', 'jpg', 'webp'].includes(fileExtension)) {
        this.validExtension = false;
        return;
      } else {
        this.validExtension = true;
      }

      // build full picture path
      const imageUrl = 'assets/img/Resources/Salas/' + file.name;

      // set pathImage value to the form
      this.resourceForm.patchValue({
        pathImages: imageUrl,

      });

      this.selectedFileName = file.name;
      if (this.isEditing && !this.isNewImage) {
        // if is editing and not new image
        this.selectedFile = imageUrl;
        this.pathImage = this.getImageUrlPath(imageUrl);
      } else {
        // if is editing and new image, or new resource
        this.selectedFile = file;
        this.pathImage = this.getImageUrl(file);
      }
    }
  }

  clearFile(): void {
    this.resourceForm.patchValue({
      pathImages: '',
    });
    this.selectedFile = null;
    this.isNewImage = true;
    this.selectedFileName = '';
  }

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
    ;
  }

  getImageUrlPath(path: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  close(): void {
    const state = true;
    this.modalRef.close(state);
  }

  async findRegionById(id: number): Promise<Region> {
    return this.listRegions.find(region => region.idRegion === id)!;
  }

  findTypeResourceById(id: number): ResourceType {
    return this.listTypeResources.find(typeResource => typeResource.idTypeResource === id)!;
  }

  buildRegion(): Region {
    return this.listRegions.find(region => region.idRegion === this.resourceForm.value.idRegion)!;
  }

  buildNewLocation(): LocationCreate {

    const location: LocationCreate = {
      idRegion: this.buildRegion(),
      place: this.resourceForm.value.place,
      address: this.resourceForm.value.address,
      floor: parseInt(this.resourceForm.value.floor),
    };
    return location;
  };

  buildNewResource(): ResourceCreate {
    const resource: ResourceCreate = {
      idResource: 0,
      idLocation: this.buildNewLocation(),
      idTypeResource: this.buildTypeResource(),
      idDadResource: 0,
      capacity: parseInt(this.resourceForm.value.capacity),
      codNumber: this.resourceForm.value.codNumber,
      content: '',
      price: parseInt(this.resourceForm.value.price),
      isParking: this.findTypeResourceById(this.resourceForm.value.idTypeResource).name.toLowerCase() == 'parqueadero' ? true : false,
      pathImages: this.resourceForm.value.pathImages,
      name: this.resourceForm.value.name,
      description: this.resourceForm.value.description
    };
    return resource;
  }

  async buildLocation(): Promise<LocationCreate> {

    const location: LocationCreate = {
      idLocation: this.resource.idLocation.idLocation,
      idRegion: this.buildRegion(),
      place: this.resourceForm.value.place,
      address: this.resourceForm.value.address,
      floor: parseInt(this.resourceForm.value.floor),
    };
    return location;
  };

  buildTypeResource(): TypeResource {
    return this.listTypeResources.find(typeResource => typeResource.idTypeResource === this.resourceForm.value.idTypeResource)!;
  }

  async buildResource(): Promise<ResourceCreate> {
    const resource: ResourceCreate = {
      idResource: this.resource.idResource,
      idLocation: await this.buildLocation(),
      idTypeResource: this.buildTypeResource(),
      // parentResource: this.resource.parentResource,
      idDadResource: 0,
      content: '',
      capacity: parseInt(this.resourceForm.value.capacity),
      codNumber: this.resourceForm.value.codNumber,
      price: parseInt(this.resourceForm.value.price),
      isParking: this.findTypeResourceById(this.resourceForm.value.idTypeResource).name.toLowerCase() == 'parqueadero' ? true : false,
      pathImages: this.resourceForm.value.pathImages,
      name: this.resourceForm.value.name,
      description: this.resourceForm.value.description};
    return resource;
  }

  async save() {
    if (this.isEditing) {
      this.resourceService.update(await this.buildResource(), this.resource.idResource).subscribe((resource) => {
        AlertHandler.show('Se ha modificado el recurso exitosamente', AlertType.SUCCESS)
        this.close();
      }, error => {
        AlertHandler.show('No se ha podido modificar el recurso', AlertType.ERROR)
      })

    } else {
      this.resourceService.save(this.buildNewResource()).subscribe((resource) => {
        AlertHandler.show('Se ha creado un nuevo recurso exitosamente', AlertType.SUCCESS)
        this.close();
      },
        error => {
          AlertHandler.show('No se ha podido crear el recurso', AlertType.ERROR)
        })
    }
  }
}
