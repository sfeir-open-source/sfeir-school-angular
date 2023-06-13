import { NaPipe } from './na.pipe';

describe('NaPipe', () => {
  let pipe: NaPipe;

  beforeEach(() => {
    pipe = new NaPipe();
  });

  test('should create an instance of NaPipe', () => {
    expect(pipe).toBeInstanceOf(NaPipe);
  });
  test("should show the value if it's defined", () => {
    expect(pipe.transform('SFEIR')).toBe('SFEIR');
  });
  test('should show N/A if the value is undefined and no default undefined value provided', () => {
    expect(pipe.transform(undefined)).toBe('N/A');
  });
  test('should show the default undefined value if provided and if there is no value to transform', () => {
    expect(pipe.transform(undefined, 'No Value')).toBe('No Value');
  });
});
