export class ServerUserError extends Error {
  constructor(message: string, public rq?: Response) {
    super(message);
  }
}
