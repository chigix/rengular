export class UnknownType extends Error {
  constructor(name: string) { super(`Type [${name}] is not registered.`); }
}

export class UnknownComponent extends Error {
  constructor(componentName: string) { super(`No Type registered for Component:${componentName}`); }
}
