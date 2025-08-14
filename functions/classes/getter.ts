type data = Database.User | Database.Index | Database.getOwner;

export default class Get {
  public static age(year: number, month: number, date?: string): number {
    if (!date) return 0;

    const birthday: string[] = date.split('-');

    const age: number = year - Number(birthday[0]);
    const thisYear: number = Number(birthday[1]) - month - 1;

    return age + (thisYear > 0 ? -1 : 0);
  }

  public static filter(data: data[], id: Database.id): data {
    const result = data.filter((item) => item.id === id)[0];

    return result;
  }

  public static userData(rawData: Database.User): Database.User {
    const { id, email, name, created_by, role, tags, active, enterprise_id } =
      rawData;

    return { id, email, name, created_by, role, tags, active, enterprise_id };
  }
}
