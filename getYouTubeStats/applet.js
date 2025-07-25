export async function run({ videoUrl }) {
  try {
    // Extract video ID from various YouTube URL formats
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return "❌ Invalid YouTube URL. Please provide a valid YouTube video URL.";
    }

    // Use YouTube API to get video statistics
    const apiKey = "{{YOUTUBE_API_KEY}}";
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=statistics,snippet`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return "❌ Video not found or may be private/unavailable.";
    }
    
    const video = data.items[0];
    const stats = video.statistics;
    const snippet = video.snippet;
    
    // Format the response
    const viewCount = parseInt(stats.viewCount).toLocaleString();
    const likeCount = stats.likeCount ? parseInt(stats.likeCount).toLocaleString() : "N/A";
    const commentCount = stats.commentCount ? parseInt(stats.commentCount).toLocaleString() : "N/A";
    
    return `📊 **YouTube Video Statistics**
    
🎥 **Title:** ${snippet.title}
👁️ **Views:** ${viewCount}
👍 **Likes:** ${likeCount}
💬 **Comments:** ${commentCount}
📅 **Published:** ${new Date(snippet.publishedAt).toLocaleDateString()}
👤 **Channel:** ${snippet.channelTitle}

🔗 **Video:** https://youtu.be/${videoId}`;
    
  } catch (error) {
    console.log("YouTube Stats Error:", error);
    return "❌ Error fetching video statistics. Please check the URL and try again.";
  }
}

// Helper function
function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}
