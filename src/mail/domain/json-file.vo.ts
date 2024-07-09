export class JsonFileVO {
  constructor(
    public readonly content: JSON,
    public readonly filename: string,
  ) { }
}
