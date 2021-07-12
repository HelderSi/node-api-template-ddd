import { v4 as uuidv4 } from "uuid";
import { IFoo } from "modules/foos/models/IFoo";

class Foo implements IFoo {
  id?: string;
  name: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Foo };