type EventHandler = (data?: any) => void;
type WildCardEventHandler = (type: string, data?: any) => void;

interface IEventHandlerMap {
  '*'?: WildCardEventHandler[];
  [type: string]: EventHandler[] | undefined;
}

export default class EventCycle {
  private cycles: IEventHandlerMap;

  constructor(all?: IEventHandlerMap) {
    this.cycles = all || Object.create(null);
  }

  public on(type: string, handler: EventHandler) {
    (this.cycles[type] || (this.cycles[type] = [])).push(handler);
  }

  public off(type: string, handler: EventHandler) {
    if (!this.cycles[type]) return;
    if (!handler) {
      this.cycles[type] = [];
      return;
    }
    this.cycles[type] = (this.cycles[type] || []).filter(
      (child: EventHandler) => child !== handler
    );
  }

  public emit(type: string, evt?: any) {
    const handlers = this.cycles[type] || [];
    handlers.slice().map(handler => {
      handler(evt);
    });
    (this.cycles['*'] || []).slice().map(handler => {
      handler(type, evt);
    });
  }
}
