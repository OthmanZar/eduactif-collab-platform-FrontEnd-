import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { projectsDetailsResolverResolver } from './projects-details-resolver.resolver';

describe('projectsDetailsResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => projectsDetailsResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
