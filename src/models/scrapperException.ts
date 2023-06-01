export default class ScrapperException extends Error {
  message: string;
  name: string;

  constructor(message: string, name: string) {
    super();
    this.message = message;
    this.name = name;
  }

  toJSON(): String {
    return JSON.stringify({
      name: this.name,
      message: this.message,
    });
  }
}
