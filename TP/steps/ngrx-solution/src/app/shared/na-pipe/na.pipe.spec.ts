/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NaPipe } from './na.pipe';

describe('NaPipe', () => {
  it('create an instance', () => {
    let pipe = new NaPipe();
    expect(pipe).toBeTruthy();
  });

  describe('should return N/A...', () => {
    it('for NULL', () => {
      let pipe = new NaPipe();
      let result = pipe.transform(null);
      expect(result).toContain('N/A');
    });

    it('for UNDEFINED', () => {
      let pipe = new NaPipe();
      let result = pipe.transform(undefined);
      expect(result).toContain('N/A');
    });

    it('for "" (empty string)', () => {
      let pipe = new NaPipe();
      let result = pipe.transform('');
      expect(result).toContain('N/A');
    });
  });
  describe('Should not return N/A', () => {
    it('for a given manager name: Foo Bar', () => {
      let pipe = new NaPipe();
      let result = pipe.transform('Foo Bar');
      expect(result).toContain('Foo Bar');
    });
  });
});
