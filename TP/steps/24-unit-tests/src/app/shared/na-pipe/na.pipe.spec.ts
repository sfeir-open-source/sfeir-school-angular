/* tslint:disable:no-unused-variable */

import { NaPipe } from './na.pipe';

xdescribe('NaPipe', () => {
  it('create an instance', () => {
    const pipe = new NaPipe();
    expect(pipe).toBeTruthy();
  });

  describe('should return N/A...', () => {
    it('for NULL', () => {
      // todo
      expect(true).toBe(false);
    });

    it('for UNDEFINED', () => {
      // todo
      expect(true).toBe(false);
    });

    it('for "" (empty string)', () => {
      // todo
      expect(true).toBe(false);
    });
  });
  describe('Should not return N/A', () => {
    it('for a given manager name: Foo Bar', () => {
      // todo
      expect(true).toBe(false);
    });
  });
});
