type EventHandler = (data?: any) => void;
type WildCardEventHandler = (type: string, data?: any) => void;

interface IEventHandlerMap {
  '*'?: WildCardEventHandler[];
  [type: string]: EventHandler[] | undefined;
}

export default class EventCycle {
  private cycles: IEventHandlerMap;
  private onceMap: Map<string, EventHandler>;

  constructor(cycles?: IEventHandlerMap) {
    this.cycles = cycles || Object.create(null);
    this.onceMap = new Map();
  }

  public on(type: string, handler: EventHandler) {
    (this.cycles[type] || (this.cycles[type] = [])).push(handler);
  }

  public once(type: string, handler: EventHandler) {
    this.onceMap.set(type, handler);
    (this.cycles[type] || (this.cycles[type] = [])).push(handler);
  }

  public off(type: string, handler?: EventHandler) {
    const handlers = this.cycles[type] || [];
    if (!handlers.length) return;
    if (!handler) {
      this.cycles[type] = [];
      return;
    }
    this.cycles[type] = handlers.filter(
      (child: EventHandler) => child !== handler
    );
  }

  public emit(type: string, evt?: any) {
    this.cycles[type] = (this.cycles[type] || [])
      .slice()
      .map(handler => {
        handler(evt);
        return this.onceMap.get(type) === handler ? undefined : handler;
      })
      .filter((item: EventHandler | undefined) => {
        if (item !== undefined) return item;
        this.onceMap.delete(type);
        this.off(type);
      }) as EventHandler[];
    (this.cycles['*'] || []).slice().map(handler => {
      handler(type, evt);
    });
  }
}
