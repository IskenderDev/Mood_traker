export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
}

export interface SigninValues {
  email: string;
  password: string;
}

export interface Route {
  id: number;
  name: string;
  route?: string;
  icon: string;
}

export interface QuoteItem {
  quote: string;
  icon: string;
  color: string;
  _id?: string;
}

export interface Quote {
  quote: QuoteItem[];
}

export interface MoodEmojis {
  icon: string;
  name: string;
  value: number;
}

export interface JournalItem {
  mood: MoodEmojis;
  title: string;
  content: string;
  date: Date;
  _id?: string;
}
export interface JournalValues {
  journals: JournalItem[];
}

export interface JwtPayload {
  exp: number;
}

export interface ArticleValues {
  title: string;
  url: string;
  urlToImage: string | null;
}

export interface UserValues {
  fullName: string;
  email: string;
}
