import { Na } from './na';

const na = new Na();
describe('NA', () => {
  describe('Instance', () => {
    it('should create an instance of Na', () => {
      expect(na).toBeInstanceOf(Na);
    });
  });
  describe('Logic', () => {
    it('should return the name of the value', () => {
      expect(na.transform('John')).toBe('John');
    });
    it('should return the custom message if the value is undefined', () => {
      expect(na.transform(undefined, 'No Value Provided')).toBe('No Value Provided');
    });
    it('should return the custom message if the value is null', () => {
      expect(na.transform(null, 'No Value Provided')).toBe('No Value Provided');
    });
    it('should return the custom message if the value is empty', () => {
      expect(na.transform('', 'No Value Provided')).toBe('No Value Provided');
    });
    it('should return the default message if the value is not provided', () => {
      expect(na.transform(undefined)).toBe('N/A');
    });
  });
});
