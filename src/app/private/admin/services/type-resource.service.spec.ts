import { TestBed } from '@angular/core/testing';

import { ResourceTypeService } from './resource-type.service';

describe('TypeResourceService', () => {
  let service: ResourceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
