import { createClient } from '@supabase/supabase-js';

export default class Database {
  public static connection() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    const connection = createClient(supabaseUrl, supabaseAnonKey);
    return connection;
  }

  public static select: Query.Select = async function (table, columns, params) {
    const db = Database.connection();
    try {
      if (!params) {
        const { data } = await db.from(table).select(columns);
        return data as unknown as Query.Response;
      }

      const { exclude, column, value } = params;
      if (exclude) {
        const { data } = await db
          .from(table)
          .select(columns)
          .neq(column, value);
        return data as unknown as Query.Response;
      }

      const { data } = await db.from(table).select(columns).eq(column, value);

      return data as unknown as Query.Response;
    } catch {
      return [];
    }
  };

  public static insert: Query.Insert = async function (table, array, select) {
    const connection = Database.connection();

    try {
      if (!select) {
        const { error } = await connection.from(table).insert(array);

        if (error) return [];
        return [];
      } else {
        const { data, error } = await connection
          .from(table)
          .insert(array)
          .select();

        if (error) return [];
        return data as unknown as Query.Response;
      }
    } catch {
      return [];
    }
  };

  public static update: Query.Update = async function (
    table,
    query,
    { column, value },
  ) {
    const connection = Database.connection();
    const { data, error } = await connection
      .from(table)
      .update(query)
      .eq(column, value)
      .select();

    if (error) return [];

    return data as Query.Response;
  };

  // public static async login(email: string, password: string) {
  //   const connection = Database.connection();
  //   let { data, error } = await connection.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) return error;

  //   return data;
  // }
}
