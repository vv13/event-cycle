import EventCycle from './';

describe('EventCycle#', () => {
  let eventCycle: any;

  beforeEach(() => {
    eventCycle = new EventCycle();
  });

  describe('off()', () => {
    test('should move cb with specific function', () => {
      const fn = jest.fn();
      eventCycle.on('test', fn);
      eventCycle.off('test', fn);
      eventCycle.emit('test');
      expect(fn).not.toBeCalled();
    });
    test('should move all type listener with no cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.off('test');
      eventCycle.emit('test');
      expect(cb1).not.toBeCalled();
      expect(cb2).not.toBeCalled();
    });
    test('should move type listener with cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.off('test', cb1);
      eventCycle.emit('test');
      expect(cb1).not.toBeCalled();
      expect(cb2).toBeCalledTimes(1);
    });
    test('should move wirdcard cb', () => {
      const cbwild = jest.fn();
      eventCycle.on('*', cbwild);
      eventCycle.off('*', cbwild);
      eventCycle.emit('something', 'testArgs');
      expect(cbwild).not.toBeCalled();
    });
  });
  describe('on & emit', () => {
    test('emit() should trigger specific type listener', () => {
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
    test('emit() should trigger wildcard listener', () => {
      const cb = jest.fn();
      const cbwild = jest.fn();
      eventCycle.on('test', cb);
      eventCycle.on('*', cbwild);
      eventCycle.emit('test', 'testArgs');
      expect(cb).toBeCalledTimes(1);
      expect(cbwild).toBeCalledTimes(1);
    });
  });
  describe('once()', () => {
    test('once() should only called once', () => {
      const cb = jest.fn();
      eventCycle.once('test', cb);
      eventCycle.emit('test', 'testArgs');
      eventCycle.emit('test', 'testArgs');
      expect(cb).toBeCalledTimes(1);
    });
    test('once() should only called once when one type has multi-one subscriber', () => {
      const cbon = jest.fn();
      const cbonce = jest.fn();
      eventCycle.once('test', cbonce);
      eventCycle.on('test', cbon);
      eventCycle.emit('test');
      eventCycle.emit('test');
      expect(cbon).toBeCalledTimes(2);
      expect(cbonce).toBeCalledTimes(1);
    });
  });
});
