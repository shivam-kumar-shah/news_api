import { CategoryEnum } from "./enums";

export default class BingParamaters {
  category: CategoryEnum;
  count: number;
  offset: number;

  constructor(category: CategoryEnum, count?: number, offset?: number) {
    this.category = category;
    this.count = count ?? 10;
    this.offset = offset ?? 0;
  }
}
