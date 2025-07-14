export async function run({ city }) {
  const res = await fetch(`https://wttr.in/${city}?format=3`);
  return await res.text();
}

export async function onGuildMemberAdd({ user }) {
  return `Welcome ${user.username}!`;
}
