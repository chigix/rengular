export class UnknownChildren extends Error {
  constructor(name: string) { super(`ChildComponent [${name}] is not defined.`); }
}
