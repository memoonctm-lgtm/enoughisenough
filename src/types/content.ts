export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
}

export interface BoardMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
  instagram: string;
  facebook: string;
  google: string;
}

export interface SiteContent {
  theme: ThemeColors;
  siteName: string;
  tagline: string;
  home: {
    heroHeadline: string;
    heroSubheadline: string;
    missionStatement: string;
    heroImage: string;
    lifeCoachName: string;
    lifeCoachTitle: string;
    lifeCoachBio: string;
    lifeCoachImage: string;
  };
  about: {
    title: string;
    missionTitle: string;
    missionText: string;
    overviewTitle: string;
    overviewText: string;
    image: string;
  };
  services: {
    title: string;
    subtitle: string;
    pricingNote: string;
    items: Service[];
  };
  specialOffers: {
    title: string;
    subtitle: string;
    description: string;
    formTitle: string;
    formDescription: string;
  };
  blog: {
    title: string;
    subtitle: string;
    posts: BlogPost[];
  };
  contact: ContactInfo;
  boardMembers: BoardMember[];
}
