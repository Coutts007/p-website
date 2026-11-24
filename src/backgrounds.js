// Background photographs come from the repo's /images folder. Any file named
// background-<number>.(jpg|jpeg|png|webp|avif) is picked up and shown in
// number order as the visitor scrolls. Add, replace or remove files there and
// the site follows, with no code changes.
const found = import.meta.glob("../images/background-*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const backgrounds = Object.entries(found)
  .map(([path, url]) => ({ url, n: Number((path.match(/background-(\d+)/i) || [])[1]) }))
  .filter((b) => Number.isFinite(b.n))
  .sort((a, b) => a.n - b.n)
  .map((b) => b.url);
