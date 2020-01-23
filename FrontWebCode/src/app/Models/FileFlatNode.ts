/** Flat node with expandable and level information */
export class FileFlatNode {
    constructor(
      public expandable: boolean, public name: string, public level: number, public quantity: number) {}
  }