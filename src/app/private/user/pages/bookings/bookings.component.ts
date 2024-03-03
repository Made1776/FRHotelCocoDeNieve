import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SearchResourceDto } from "../../../../models/dto/SearchResourceDto";
import { ResourceType } from "../../../../models/ResourceType";
import { ResourceTypeService } from "../../../admin/services/resource-type.service";
import { ICONS } from "../../../../../constants/icons.const";
import { MINUTES } from "../../../../../constants/minutes.const";
import { Resource } from "../../../../models/Resource";
import { ResourceService } from "../../../admin/services/resource.service";
import { RegionService } from "../../../admin/services/region.service";
import { ReservationService } from "../../services/reservation.service";
import { AlertHandler } from "../../../../utils/AlertHandler";
import { AlertType } from "../../../../models/Enums/AlertType.enum";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  searchForm: FormGroup;
  resourceTypes: ResourceType[];
  filteredResourceTypes: ResourceType[];

  resources: Resource[];
  leakedResources: Resource[];
  resourcesFilteredSearch: Resource[];
  minutes: number[] = MINUTES;

  constructor(
    private builder: FormBuilder,
    private resourceTypeService: ResourceTypeService,
    private resourceService: ResourceService,
    private regionService: RegionService,
    private reservationService: ReservationService,
  ) {
    this.resourceTypes = []
    this.resources = [];
    this.leakedResources = [];
    this.resourcesFilteredSearch = [];
    this.filteredResourceTypes = [];
    this.searchForm = new FormGroup({});
    this.buildForm();
  }

  ngOnInit() {
    this.loadResourceTypes();
    this.loadResources();
  }

  private loadResourceTypes() {
    this.resourceTypeService.getAll().subscribe({
      next: (resourceTypes) => {
        this.resourceTypes = resourceTypes;
        this.resourceTypes.forEach(resourceType => {
          resourceType.icon = ICONS[resourceType.name.toLowerCase()];
        });
        this.sortResourceTypes();
      },
      error: () => AlertHandler.show('No se pudieron cargar los tipos de recursos', AlertType.ERROR)
    });
  }

  private loadResources() {

    if (!this.regionService.currentRegion) return AlertHandler.show('No hay región seleccionada', AlertType.ERROR);

    this.resourceService.getAllByRegionId(this.regionService.currentRegion.idRegion).subscribe({
      next: (resources) => {
        this.resources = resources;
        this.leakedResources = resources;
      },
      error: () => AlertHandler.show('No se pudieron cargar los recursos', AlertType.ERROR)
    });
  }

  private sortResourceTypes() {
    this.resourceTypes.sort((a, b) => a.name.localeCompare(b.name));
    this.resourceTypes.sort((a, b) => (a.name.toLowerCase() === 'otros') ? 1 : (b.name.toLowerCase() === 'otros') ? -1 : 0);
  }

  private filterResources(typesToFilter: ResourceType[], resourcesToFilter: Resource[]) {
    if (typesToFilter.length === 0 || !resourcesToFilter || resourcesToFilter.length === 0) {
      this.leakedResources = resourcesToFilter || this.resources;
      return;
    }

    this.leakedResources = resourcesToFilter.filter(resource => {
      return typesToFilter.some(type => type.idTypeResource === resource.idTypeResource.idTypeResource);
    });
  }

  private buildForm() {
    this.searchForm = this.builder.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
    });
  }

  private buildSearchResourceDto(): SearchResourceDto {
    const rawDate = this.searchForm.get('date')?.value;
    const date = rawDate ? new Date(rawDate) : new Date();
    const time = this.searchForm.get('time')?.value;
    date.setHours(+time.split(':')[0]);
    date.setMinutes(+time.split(':')[1]);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return {
      date: new Date(date.setDate(date.getDate() + 1)),
      hours: this.searchForm.get('hours')?.value ?? 0,
      minutes: +this.searchForm.get('minutes')?.value ?? 0,
      capacity: this.searchForm.get('capacity')?.value ?? 0,
      idRegion: this.regionService.currentRegion?.idRegion ?? 0,
    };
  }

  onSearchResource() {
    if (this.searchForm.invalid) return;
    const searchResourceDto = this.buildSearchResourceDto();
    console.log(searchResourceDto);
    this.resourceService.findAvailable(searchResourceDto).subscribe({
      next: (resources) => {
        this.resourcesFilteredSearch = resources;
        this.leakedResources = resources;
        this.resourceService.isSearchDone = true;
        this.reservationService.searchResourceDto = searchResourceDto;
        this.filterResources(this.filteredResourceTypes, resources);
      },
      error: () => {
        AlertHandler.show('No se pudieron cargar los recursos', AlertType.ERROR);
        AlertHandler.show('Por favor verifique el horario de reserva', AlertType.INFO);
      }
    });
  }

  onToggleFilterResource(resourceType: ResourceType) {

    this.filteredResourceTypes.forEach(({ idTypeResource, checked }) => {
      if (idTypeResource === resourceType.idTypeResource) {
        checked = resourceType.checked;
      }
    })

    const index = this.filteredResourceTypes.findIndex(type => type.idTypeResource === resourceType.idTypeResource);

    index !== -1 ? this.filteredResourceTypes.splice(index, 1) : this.filteredResourceTypes.push(resourceType);

    const resourcesToFilter = this.resourcesFilteredSearch.length > 0 ? this.resourcesFilteredSearch : this.resources;
    this.filterResources(this.filteredResourceTypes, resourcesToFilter);
  }

  onClearSearch() {
    this.searchForm.reset();
    this.resourcesFilteredSearch = [];
    this.leakedResources = this.resources;
    this.resourceService.isSearchDone = false;
    this.reservationService.searchResourceDto = null;
    this.filteredResourceTypes.forEach(type => type.checked = false);
    this.filteredResourceTypes = [];
  }

}
