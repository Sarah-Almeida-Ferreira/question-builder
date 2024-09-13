export class ArrayHelper {
  static trackByKey(_: number, item: any): string {
    return item.key;
  }
}
