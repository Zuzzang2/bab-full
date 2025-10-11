import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    console.log('✅ SupabaseService constructor 실행됨');
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log('키:', key);

    if (!url || !key) {
      console.log('환경변수 에러');

      throw new Error('Supabase 환경변수가 설정되지 않았습니다.');
    }
    this.client = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
