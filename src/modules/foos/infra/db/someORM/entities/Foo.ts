import { v4 as uuidv4 } from "uuid";
import { IFoo } from "modules/foos/models/IFoo";

class Foo implements IFoo {
  id: string;
  name: string;
  created_at: Date;

  constructor(name: string) {
    this.name = name
    this.id = uuidv4();
    this.created_at = new Date()
  }
}

export { Foo };