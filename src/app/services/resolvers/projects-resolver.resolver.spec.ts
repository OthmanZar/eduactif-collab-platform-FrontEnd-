import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { projectsResolverResolver } from './projects-resolver.resolver';

describe('projectsResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => projectsResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
