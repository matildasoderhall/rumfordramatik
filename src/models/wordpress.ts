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

export interface WPIssue {
  id: number;
  title: { rendered: string };
  acf: {
    issue_number: number;
    theme: string;
    content?: [
      {
        play?: string;
        playwright?: string;
      },
    ];
    preface?: string;
  };
}

export interface WPEvent {
  id: number;
  title: { rendered: string };
  acf: {
    title?: string;
    date?: string;
    description?: string;
    sticker?: string;
    theme?: string;
  };
}

export interface OpenCallACF {
  theme: string;
  description: string;
  application_deadline: string;
}

export interface WPOpenCall {
  id: number;
  title: { rendered: string };
  status: string;
  acf: OpenCallACF;
}