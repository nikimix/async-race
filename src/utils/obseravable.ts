import { EmitTypes } from '../types/types';

class Obseravable {
  private listeners: Map<string, Array<() => void>> = new Map();

  add = (type: EmitTypes, cb: () => void) => {
    if (this.listeners.has(type)) {
      this.listeners.get(type)?.push(cb);
    } else {
      this.listeners.set(type, [cb]);
    }
  };

  emit = (type: EmitTypes) => {
    if (this.listeners.has(type)) {
      this.listeners.get(type)?.forEach((cb) => cb());
    }
  };
}
export default new Obseravable();
