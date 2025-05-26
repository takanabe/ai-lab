import { supabase } from './supabaseClient';

describe('supabase client', () => {
  it('should be defined', () => {
    expect(supabase).toBeDefined();
  });
});
