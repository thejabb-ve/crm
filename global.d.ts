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
}
