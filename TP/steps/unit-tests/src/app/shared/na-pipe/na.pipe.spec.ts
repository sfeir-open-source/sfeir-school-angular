/* tslint:disable:no-unused-variable */

import { NaPipe } from './na.pipe';

describe('NaPipe', () => {
  it('create an instance', () => {
    const pipe = new NaPipe();
    console.log(pipe);
    expect(true).toBe(false);
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
    // todo
    expect(true).toBe(false);
  });
});
