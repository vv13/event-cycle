import EventCycle from './';

describe('EventCycle#', () => {
  let eventCycle: any;

  beforeEach(() => {
    eventCycle = new EventCycle();
  });

  describe('off()', () => {
    it('should move cb with specific function', () => {
      const fn = jest.fn();
      eventCycle.on('test', fn);
      eventCycle.off('test', fn);
      eventCycle.emit('test');
      expect(fn).not.toBeCalled();
    });
    it('should move all type listener with no cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.off('test');
      eventCycle.emit('test');
      expect(cb1).not.toBeCalled();
      expect(cb2).not.toBeCalled();
    });
    it('should move type listener with cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.off('test', cb1);
      eventCycle.emit('test');
      expect(cb1).not.toBeCalled();
      expect(cb2).toBeCalledTimes(1);
    });
    it('should move wirdcard cb', () => {
      const cbwild = jest.fn();
      eventCycle.on('*', cbwild);
      eventCycle.off('*', cbwild);
      eventCycle.emit('something', 'testArgs');
      expect(cbwild).not.toBeCalled();
    });
  });
  describe('on & emit', () => {
    it('emit() should trigger specific type listener', () => {
      const cb = jest.fn();
      eventCycle.on('test', cb);
      eventCycle.emit('test', 'testArgs');
      expect(cb).toBeCalledTimes(1);
      expect(cb).toBeCalledWith('testArgs');
    });
    test('emit() should trigger all same type listener', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.emit('test', 'testArgs');
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).toBeCalledTimes(1);
    });
    it('emit() should trigger wildcard listener', () => {
      const cb = jest.fn();
      const cbwild = jest.fn();
      eventCycle.on('test', cb);
      eventCycle.on('*', cbwild);
      eventCycle.emit('test', 'testArgs');
      expect(cb).toBeCalledTimes(1);
      expect(cbwild).toBeCalledTimes(1);
    });
  });
});
