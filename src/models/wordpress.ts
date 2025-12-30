export interface WPImage {
  source_url: string;
  alt_text: string;
  media_details: {
    sizes: {
      medium?: { source_url: string };
      thumbnail?: { source_url: string };
    };
  };
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
 
  _embedded?: {
    'wp:featuredmedia'?: WPImage[];
    author?: Array<{ name: string; avatar_urls: Record<string, string> }>;
  };
}