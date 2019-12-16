import EventCycle from './';

describe('EventCycle#', () => {
  let eventCycle: any;

  beforeEach(() => {
    eventCycle = new EventCycle();
  });

  describe('on()', () => {
    test('should only trigger once when register more than once', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.emit('test');
      expect(cb1).toBeCalledTimes(1);
      expect(cb2).toBeCalledTimes(1);
    })
    test('should only trigger new callback when isSolo', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1, true);
      eventCycle.on('test', cb1, true);
      eventCycle.on('test', cb2, true);
      eventCycle.emit('test');
      expect(cb1).toBeCalledTimes(0);
      expect(cb2).toBeCalledTimes(1);
    })
  })

  describe('offAll()', () => {
    test('should remove specific onAll cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.onAll(cb1);
      eventCycle.onAll(cb2);
      eventCycle.offAll(cb1);
      eventCycle.emit('something', 'testArgs');
      expect(cb1).not.toBeCalled();
      expect(cb2).toBeCalledTimes(1);
    });
    test('should remove all onAll cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.onAll(cb1);
      eventCycle.onAll(cb2);
      eventCycle.offAll();
      eventCycle.emit('something', 'testArgs');
      expect(cb1).not.toBeCalled();
      expect(cb2).not.toBeCalled();
    });
  });
  describe('off()', () => {
    test('should remove cb with specific function', () => {
      const fn = jest.fn();
      eventCycle.on('test', fn);
      eventCycle.off('test', fn);
      eventCycle.emit('test');
      expect(fn).not.toBeCalled();
    });
    test('should remove all type listener with no cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.off('test');
      eventCycle.emit('test');
      expect(cb1).not.toBeCalled();
      expect(cb2).not.toBeCalled();
    });
    test('should remove type listener with cb', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      eventCycle.on('test', cb1);
      eventCycle.on('test', cb2);
      eventCycle.off('test', cb1);
      eventCycle.emit('test');
      expect(cb1).not.toBeCalled();
      expect(cb2).toBeCalledTimes(1);
    });
    test('should remove wirdcard cb', () => {
      const cbwild = jest.fn();
      eventCycle.on('*', cbwild);
      eventCycle.off('*', cbwild);
      eventCycle.emit('something', 'testArgs');
      expect(cbwild).not.toBeCalled();
    });
  });
  describe('on() & onAll() & emit()', () => {
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
    test('emit() should trigger onAll listener', () => {
      const cb = jest.fn();
      const cbwild = jest.fn();
      eventCycle.on('test', cb);
      eventCycle.onAll(cbwild);
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
