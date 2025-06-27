import * as bcrypt from 'bcrypt';

async function run() {
  const hash = await bcrypt.hash('password', 10);
  console.log('New hash:', hash);
}

run().catch(console.error);
