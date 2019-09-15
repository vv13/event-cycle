# EventCycle
Simple and flexsible event trigger, Written by TypeScript.

- 💪 Test cover
- ✨ Type support

## Install
```
npm i event-cycle
```

## Usage
Simply initialize by Singleton Pattern:
```
// eventCycle.ts
import EventCycle from 'event-cycle';

export default new EventCycle();
```

Then use it in any function:
```
import eventCycle from './eventCycle';

// somewhere to subscribe event
eventCycle.on('hello', (data: string) => console.log(`hello ${data || 'world'}`));

// somewhere to  publish event
eventCycle.emit('hello'); // print 'hello world'
eventCycle.emit('hello', 'vv13'); // print 'hello vv13'
```

## Api
### on(type, handler)
- arguments
  - `type: string`, subscriber event name, allow duplicate
  - `handler: (data?: any) => void`, event subscription callback, accept a data by `emit`

### once(type, handler)
- arguments
  - `type: string`, subscriber event name, only trigger once, after that it will auto-cancel subscribe
  - `handler: (data?: any) => void`, event subscription callback, accept a data by `emit`

### emit(type, data)
- arguments
  - `type: string`, publisher event name, it will be trigger subscription callback
  - `data: any`, event data can be used by subscription callback

### off(type, handler)
- arguments
  - `type: string`, event name who will be removed
  - `handler?: (event?: any) => void;`, specific removing function, if it's not provided, `off` will default remove all subscriber in such type. 
