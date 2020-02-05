import { MyPipePipe } from './my-pipe.pipe';

describe('MyPipePipe', () => {
  it('create an instance', () => {
    const pipe = new MyPipePipe();
    expect(pipe).toBeTruthy();
  });
});
