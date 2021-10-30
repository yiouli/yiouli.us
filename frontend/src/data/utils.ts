import { PageData, PageType, Sitemap, SiteTree } from "./interfaces";

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
  var arr: [number, PageData][] = [];
  for (var pid in sitemap) {
    arr.push([+pid, sitemap[pid]]);
  }
  arr.sort((kv1, kv2) => {
    return kv1[1].meta.html_url.length - kv2[1].meta.html_url.length;
  });

  for (const kv of arr) {
    dfs(kv[0], kv[1], ret);
  }
  return ret;
}

export function getPageType(page: PageData): PageType {
  switch(page.meta.type) {
    case 'blog.IndividualPage': return PageType.Individual;
    case 'blog.InsightPage': return PageType.Insight;
    case 'blog.LifePage': return PageType.Life;
    case 'blog.MomentPage': return PageType.Moment;
    case 'blog.PerspectivePage': return PageType.Perspective;
    case 'blog.ProjectPage': return PageType.Project;
    default: return PageType.General;
  }
}
