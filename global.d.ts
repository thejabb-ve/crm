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

  namespace Local {
    interface recentViewed {
      id: Database.id;
      name: string;
      href: string;
    }
  }

  namespace Database {
    type id = number | undefined;
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
      sector_id?: number;
      estimated_salary?: number;
      estimated_expenses?: number;
      family_burden?: FamilyBurden[];
      type: number;
      status: number;
      owner_id: id;
    }

    interface Logs {
      id: id;
      message: string;
      via: number;
      next_meeting?: string;
      date: string;
      created_by: id;
      account_id: id;
    }

    interface User {
      id?: id;
      email: string;
      password: string;
      name: string;
      role: number;
      tier: number;
      payment_account?: id;
    }

    interface Index {
      id: number;
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
  }
}
