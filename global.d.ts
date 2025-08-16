/// <reference types="jabb-astro-components/global.d.ts"/>

export {};

declare global {
  namespace Configuration {
    type CompanyInformation = {
      readonly commercialName: string;
      readonly web: string[];
      readonly legalName: string;
      readonly id: string;
      readonly address: string;
      readonly email: string;
      readonly motive: string;
    };

    type Metadata = {
      readonly name: string;
      readonly keywords: string;
      readonly icon: string;
    };

    type Social = {
      readonly ig: string;
      readonly wa: string;
      readonly yt: string;
      readonly tw: string;
      readonly in: string;
      readonly fb: string;
    };
    interface socialIcons {
      Icon: any;
      url: string;
      ariaLabel: string;
    }

    type Rss = {
      rss: number;
      Icon: any;
      url: string;
      ariaLabel: string;
    };

    type ogType = 'website' | 'article' | 'book' | 'profile' | 'video.other';
  }

  namespace Interface {
    interface TwoButtonsProps {
      button1: Button.Button;
      button2: Button.Button;
    }
  }

  namespace Database {
    type id = number | string | undefined;
    interface FamilyBurden {
      birthday?: string;
      name?: string;
      comments: string;
    }

    interface Candidate {
      id: id;
      name: string;
      birthday?: string;
      email?: string;
      phone: string;
      instagram?: string;
      estimated_salary?: number;
      estimated_expenses?: number;
      family_burden?: FamilyBurden[];
      type: number;
      status: number;
      owner_id: id;
      enterprise_id: id;
    }

    interface Enterprise {
      id: id;
      name?: string;
      tier: number;
      payment_account?: id;
      statuses: Database.Status[];
      roles: Database.Role[];
      // user: id;
    }

    interface Account extends Candidate {
      sector_id?: number;
    }

    interface Logs {
      id?: id;
      message: string;
      via: number;
      next_meeting?: string;
      date: string;
      created_by: id;
      account_id: id;
    }

    interface getOwner {
      id?: id;
      name: string;
    }

    interface User extends getOwner {
      email: string;
      password?: string;
      created_at?: string;
      created_by?: id;
      role: id;
      active: boolean;
      tags: string[];
      enterprise_id: id;
      recent_viewed?: Recent[];
    }

    interface Index {
      id: id;
      name: string;
    }

    interface Role extends Index {
      create_logs: boolean;
      //...
    }

    interface Tier extends Role {
      month_limit_logs: number;
    }

    interface Status extends Index {
      config: string;
    }

    interface Recent extends Index {
      type: number;
    }

    interface getStatus {
      id?: string;
      statuses: Status[];
    }

    interface getRecent {
      recent_viewed: Recent[];
    }
  }

  namespace Query {
    type Response =
      | Database.User[]
      | Database.Logs[]
      | Database.Enterprise[]
      | Database.Account[]
      | Database.getStatus[];

    type Select = (
      table: string,
      columns: string,
      params?: { column: string; value: number | string; exclude?: boolean },
    ) => Promise<Response>;

    type Insert = (
      table: string,
      array: [] | {},
      select: boolean,
    ) => Promise<Response>;

    type Update = (
      table: string,
      array: {},
      where: { column: string; value: string | number },
    ) => Promise<Response>;
  }

  namespace Cookies {
    type Data =
      | Database.User
      | { owners: Database.getOwner[] }
      | { statuses: Database.Status[] }
      | { recent_viewed: Database.Recent[] };
  }
}
