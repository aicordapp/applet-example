module.exports.run = async function({ city }) {
  // a fetch-et a vm2 sandboxból kapja, nem kell importálni
  const res = await fetch(`https://wttr.in/${city}?format=3`);
  return await res.text();
}
