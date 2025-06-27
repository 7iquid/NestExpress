import * as bcrypt from 'bcrypt';

async function test() {
  const password = 'password';
  const hash = '$2b$10$kYdkJ0D6v4KxDRCZ3WDK.O2pZjTPfuAcnYkpAayPSH5u3OHuFxyK2';

  const isMatch = await bcrypt.compare(password, hash);
  console.log(`Comparing '${password}' with hash:\n${hash}`);
  console.log('Match:', isMatch);
}

test().catch(console.error);
