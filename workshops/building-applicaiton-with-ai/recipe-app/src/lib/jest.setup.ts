import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local from the project root
config({ path: resolve(__dirname, '../../.env.local') });
