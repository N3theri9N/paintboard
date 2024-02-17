export class ShapeDataCalculator {
  private downX;
  private downY;
  constructor() {
    this.downX = 0;
    this.downY = 0;
  }

  public setMouseDownPosition(x: number, y: number) {
    this.downX = x;
    this.downY = y;
  }

  public calcShapeData(x: number, y: number) {
    const left = Math.min(x, this.downX);
    const top = Math.min(y, this.downY);
    const width = Math.abs(x - this.downX);
    const height = Math.abs(y - this.downY);
    return { left, top, width, height };
  }
}
