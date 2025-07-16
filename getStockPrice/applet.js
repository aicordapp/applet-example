export async function run({ symbol = "GOOGL" }) {
  try {
    // Using Alpha Vantage API for stock data
    const API_KEY = "{{ALPHA_VANTAGE_API_KEY}}";
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Check if API returned an error
    if (data["Error Message"]) {
      return `Error: ${data["Error Message"]}`;
    }
    
    if (data["Note"]) {
      return `Rate limit reached: ${data["Note"]}`;
    }
    
    const quote = data["Global Quote"];
    
    if (!quote) {
      return `No data found for symbol: ${symbol}`;
    }
    
    const price = parseFloat(quote["05. price"]);
    const change = parseFloat(quote["09. change"]);
    const changePercent = quote["10. change percent"];
    const lastUpdated = quote["07. latest trading day"];
    
    // Format the response
    const emoji = change >= 0 ? "📈" : "📉";
    const changeText = change >= 0 ? "+" : "";
    
    return `${emoji} **${symbol}** Stock Price
💰 **Current Price:** $${price.toFixed(2)}
📊 **Change:** ${changeText}${change.toFixed(2)} (${changePercent})
📅 **Last Updated:** ${lastUpdated}`;
    
  } catch (error) {
    console.log("Error fetching stock data:", error);
    return `Sorry, I couldn't fetch the stock price for ${symbol}. Please try again later.`;
  }
}
