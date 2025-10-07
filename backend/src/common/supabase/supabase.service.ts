import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error('Supabase 환경변수가 설정되지 않았습니다.');
    }
    this.client = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
