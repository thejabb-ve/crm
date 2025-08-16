export default class Validation {
  private static validEmail(email: string): boolean {
    const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validate.test(email);
  }

  private static clearUsername(username: string): string {
    const removeSpace: string[] = username.split(' ');
    if (
      removeSpace.length > 2 ||
      (removeSpace.length > 1 && removeSpace[1].length > 0)
    )
      return '';
    const cleanUsername: string = removeSpace[0].toLowerCase();

    return cleanUsername;
  }

  public static username(username: string): string {
    if (!username || username.length < 3) return '';
    const user = this.clearUsername(username);
    return user;
  }

  public static password(password: string): boolean {
    if (!password || password.length < 6) return false;
    return true;
  }

  public static newCandidate({
    name,
    phone,
  }: {
    name: string;
    phone: string;
  }): Forms.Response {
    if (name.length < 4)
      return { response: 'Ingrese el nombre completo', status: 400 };
    if (phone.length < 10)
      return { response: 'Ingrese un número telefónico válido', status: 400 };
    return { response: '', status: 200 };
  }

  public static newLog({ via, message }: Database.Logs): Forms.Response {
    if (via <= 0)
      return { response: 'Seleccione un método de contacto', status: 400 };
    if (message.length < 4)
      return { response: 'Ingrese un mensaje válido', status: 400 };
    return { response: '', status: 200 };
  }
}
