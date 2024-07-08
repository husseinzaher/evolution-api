import { Events } from '../../types/wa.types';

export class WebhookPostDto {
  event: Events;
  instance: string;
  data: any;
  destination: string;
  date_time: string;
  sender: string;
  server_url: string;
  apikey?: string;
  from?: string;
}
