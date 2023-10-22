type ResConstructor<T> = {
  message?: string;
  body?: T | null;
};
class Res<T> {
  message?: string;
  body?: T | null;

  constructor({ message = 'Server Error', body = null }: ResConstructor<T>) {
    this.message = message;
    this.body = body;
  }
}

export default Res;
