export async function run({ city }) {
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key={{API_KEY}}&q=${city}`);
  const json = await res.json();
  return `🌤️ ${json.location.name}: ${json.current.temp_c}°C`;
}
