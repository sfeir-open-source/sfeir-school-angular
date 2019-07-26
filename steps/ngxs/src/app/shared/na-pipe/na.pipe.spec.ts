/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NaPipe } from './na.pipe';

describe('NaPipe', () => {
  it('create an instance', () => {
    const pipe = new NaPipe();
    expect(pipe).toBeTruthy();
  });

  describe('should return N/A...', () => {
    it('for NULL', () => {
      const pipe = new NaPipe();
      const result = pipe.transform(null);
      expect(result).toContain('N/A');
    });

    it('for UNDEFINED', () => {
      const pipe = new NaPipe();
      const result = pipe.transform(undefined);
      expect(result).toContain('N/A');
    });

    it('for "" (empty string)', () => {
      const pipe = new NaPipe();
      const result = pipe.transform('');
      expect(result).toContain('N/A');
    });
  });
  describe('Should not return N/A', () => {
    it('for a given manager name: Foo Bar', () => {
      const pipe = new NaPipe();
      const result = pipe.transform('Foo Bar');
      expect(result).toContain('Foo Bar');
    });
  });
});
