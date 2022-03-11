import { NaPipe } from './na.pipe';

describe('NaPipe', () => {
  let naPipe: NaPipe;
  beforeEach(() => {
    naPipe = new NaPipe();
  });
  afterEach(() => {
    naPipe = null;
  });

  it('should create an instance of NaPipe', () => {
    expect(naPipe).toBeTruthy();
  });

  it('should return the value if provided', () => {
    const naPipeApply = naPipe.transform('SFEIR');
    expect(naPipeApply).toEqual('SFEIR');
  });

  it('should return N/A if value not provided and custom message not provided too', () => {
    const naPipeApply = naPipe.transform(null);
    expect(naPipeApply).toEqual('N/A');
  });

  it('should return custom message if provided and  if value not provided', () => {
    const naPipeApply = naPipe.transform(null, 'Custom Message');
    expect(naPipeApply).toEqual('Custom Message');
  });
});
