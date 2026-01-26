export interface CF7Response {
  status: 'mail_sent' | 'validation_failed' | 'mail_failed' | 'spam';
  message: string;
  invalid_fields?: { field: string; message: string }[];
}