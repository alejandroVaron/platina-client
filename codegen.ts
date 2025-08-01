import * as dotenv from 'dotenv';
import type { CodegenConfig } from '@graphql-codegen/cli';

dotenv.config();

const config: CodegenConfig = {
  schema: `${process.env.VITE_API_URL}/graphql` || 'http://localhost:3000/graphql',
  documents: 'src/lib/graphql/**/*.ts',
  generates: {
    'src/lib/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;