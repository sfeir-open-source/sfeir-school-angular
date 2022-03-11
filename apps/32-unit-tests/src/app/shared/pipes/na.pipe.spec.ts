import { NaPipe } from './na.pipe';

describe('NaPipe', () => {
  let naPipe: NaPipe;
  beforeEach(() => {
    naPipe = new NaPipe();
  });
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    naPipe = null;
  });

  it('should create an instance of NaPipe', () => {
    /**TODO:
     * you must expect that naPipe is an instance of the class NaPipe
     */
  });

  it('should return the value if provided', () => {
    /**TODO:
     * if ypu apply the transform function with the value SFEIR, you must expect that the result is SFEIR
     */
  });

  it('should return N/A if value not provided and custom message not provided too', () => {
    /**TODO:
     * if you apply the transform function with a null, value and if you not provide a default message, you must expect the result is N/A
     */
  });

  it('should return custom message if provided and  if value not provided', () => {
    /**TODO:
     * if you apply the transform function with a null, value and if you  provide a custom message, you must expect the result is your custom message
     */
  });
});
