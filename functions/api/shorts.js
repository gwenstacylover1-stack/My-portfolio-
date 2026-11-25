// Auto-updating YouTube Shorts API for S.TARAK Portfolio
// Live endpoint: https://tarak-portfolio.pages.dev/api/shorts?limit=6

const HANDLE = "@TARAKYT-i9z";
const CHANNEL_ID = ""; // Optional: paste your 24-char UC... Channel ID here for instant lookup
const PLAYLIST_ID = ""; // Optional: paste a PL... playlist ID to show only a curated playlist

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function decodeXml(str = "") {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

async function resolveChannelId(handle) {
  const res = await fetch(`https://www.youtube.com/${handle}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: "SOCS=CAI; CONSENT=YES+cb",
    },
    cf: { cacheTtl: 86400, cacheEverything: true },
  });
  if (!res.ok) return null;
  const html = await res.text();
  const match =
    html.match(/feeds\/videos\.xml\?channel_id=(UC[\w-]{22})/) ||
    html.match(/youtube\.com\/channel\/(UC[\w-]{22})/) ||
    html.match(/"externalId":"(UC[\w-]{22})"/) ||
    html.match(/"channelId":"(UC[\w-]{22})"/) ||
    html.match(/"browseId":"(UC[\w-]{22})"/);
  return match ? match[1] : null;
}

function parseAtomFeed(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  return entries
    .map((m) => {
      const block = m[1];
      const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      if (!id) return null;
      const rawTitle = block.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "YouTube Short";
      const altLink = block.match(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"/)?.[1] || "";
      const published = block.match(/<published>([^<]+)<\/published>/)?.[1] || "";
      const isShort = altLink.includes("/shorts/");
      return {
        id,
        title: decodeXml(rawTitle).trim(),
        url: isShort ? altLink : `https://www.youtube.com/shorts/${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/oar2.jpg`,
        fallbackThumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published,
        isShort,
      };
    })
    .filter(Boolean);
}

async function fetchRss(feedUrl, bypassCache) {
  const res = await fetch(feedUrl, {
    headers: { "User-Agent": "S.TARAK-Portfolio-Shorts/1.0" },
    cf: bypassCache ? { cacheTtl: 0 } : { cacheTtl: 900, cacheEverything: true },
  });
  if (!res.ok) return [];
  return parseAtomFeed(await res.text());
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function onRequestGet(context) {
  try {
    const reqUrl = new URL(context.request.url);
    const limit = Math.min(Math.max(Number(reqUrl.searchParams.get("limit")) || 6, 1), 15);
    const bypassCache = reqUrl.searchParams.get("refresh") === "1";

    let items = [];
    let source = "rss";

    if (PLAYLIST_ID) {
      items = await fetchRss(
        `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`,
        bypassCache
      );
      source = "playlist";
    } else {
      const channelId = CHANNEL_ID || (await resolveChannelId(HANDLE));
      if (!channelId) {
        return new Response(
          JSON.stringify({
            error: "Auto-detect blocked. Paste your UC... Channel ID from youtube.com/account_advanced into CHANNEL_ID.",
          }),
          { status: 502, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
        );
      }

      // 1) Try YouTube's automatic Shorts-only UUSH playlist feed first
      const uushId = `UUSH${channelId.slice(2)}`;
      items = await fetchRss(
        `https://www.youtube.com/feeds/videos.xml?playlist_id=${uushId}`,
        bypassCache
      );
      source = "uush-shorts";

      // 2) Automatic fallback to main channel feed if UUSH is empty
      if (!items.length) {
        const allUploads = await fetchRss(
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
          bypassCache
        );
        const shortsOnly = allUploads.filter((v) => v.isShort);
        items = shortsOnly.length ? shortsOnly : allUploads;
        source = "channel-fallback";
      }
    }

    return new Response(
      JSON.stringify({
        handle: HANDLE,
        source,
        count: Math.min(items.length, limit),
        updatedAt: new Date().toISOString(),
        shorts: items.slice(0, limit),
      }),
      {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
          "Cache-Control": bypassCache ? "no-store" : "public, max-age=900, s-maxage=900",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch YouTube Shorts", details: err.message }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
}
