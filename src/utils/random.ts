class RandomNumber {
  private generateNumberBuffer(): number {
    const number = crypto.getRandomValues(new Uint32Array(1))[0];
    return number / (0xffffffff + 1);
  }

  public generateRandomNumber = () => {
    return crypto.getRandomValues(new Uint8ClampedArray(1))[0];
  };

  public generateElementOfList(list: unknown[]): unknown {
    const index = Math.floor(this.generateNumberBuffer() * list.length);
    return list[index];
  }
}

export default new RandomNumber();
