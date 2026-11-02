// Tells Bing (and the other IndexNow engines) about every URL in the live sitemap.
//
// ChatGPT search draws on Bing's index, so a page Bing has not re-crawled is a page
// ChatGPT cannot recommend. Runs after each deploy; the key file that proves the site
// is ours lives at public/<KEY>.txt. A failure here never fails the deploy.
const KEY = "efc7bc193ebfc38b2d485023c2577573";
const HOST = "www.mokeet-elsuarye.com";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
// Image entries are also <loc> values inside <image:image>; only page URLs are sent.
const urlList = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) {
  console.log("indexnow: sitemap had no URLs, nothing sent");
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
// 200 and 202 both mean accepted (202: the key is still being verified).
console.log(`indexnow: ${urlList.length} URLs, HTTP ${response.status} ${await response.text()}`);
