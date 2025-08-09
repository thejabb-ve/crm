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
}
