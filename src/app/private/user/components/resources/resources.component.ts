import { Component, Input } from '@angular/core';
import { Resource } from "../../../../models/Resource";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {

  @Input() resources: Resource[];

  constructor() {
    this.resources = [];
  }

}
