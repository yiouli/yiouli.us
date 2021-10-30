import { PageData, Sitemap, SiteTree } from "./interfaces";

export function buildSiteTrees(sitemap: Sitemap): SiteTree[] {
  function dfs(pageId: number, page: PageData, trees: SiteTree[]) {
    for (const t of trees) {
      if (page.meta.html_url.startsWith(t.url)) {
        dfs(pageId, page, t.children);
        return;
      }
    };
    // no match
    trees.push({
      id: pageId,
      url: page.meta.html_url,
      page: page,
      children: [],
    });
  }

  var ret: SiteTree[] = [];
  for (var pid in sitemap) {
    dfs(+pid, sitemap[pid], ret);
}
  return ret;
}
