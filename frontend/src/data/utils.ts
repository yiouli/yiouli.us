import { AxiosError } from "axios";
import { PageData, PageType, Sitemap, SiteTree } from "./interfaces";

export function buildSiteTrees(sitemap: Sitemap): SiteTree[] {

  // needs to strip trailing spash for router to work
  function cleanUrl(url: string): string {
    return url.endsWith('/') ? url.substring(0, url.length-1): url;
  }

  function getRelativePath(url: string, rootUrl: string): string {
    if (url == rootUrl) return '/';
    return url.slice(rootUrl.length);
  }

  function dfs(
    pageId: number,
    page: PageData,
    trees: SiteTree[],
    root: SiteTree | null,
  ) {
    for (const t of trees) {
      if (page.meta.html_url.startsWith(t.url)) {
        dfs(pageId, page, t.children, root || t);
        return;
      }
    };
    // no match
    trees.push({
      id: pageId,
      url: cleanUrl(page.meta.html_url),
      relativePath: root ? getRelativePath(cleanUrl(page.meta.html_url), root.url) : '/',
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
    dfs(kv[0], kv[1], ret, null);
  }
  return ret;
}

export function getCurrentSiteTree(pageId: number, trees: SiteTree[]): SiteTree {
  function dfs(root: SiteTree): boolean {
    if (pageId == root.id) {
      return true;
    }
    return root.children.some(dfs);
  }

  for (const t of trees) {
    if (dfs(t)) {
      return t;
    }
  }
  throw "Cannot find page in any SiteTree";
}

export function getPageType(page: PageData): PageType {
  switch (page.meta.type) {
    case 'blog.IndividualPage': return PageType.Individual;
    case 'blog.InsightPage': return PageType.Insight;
    case 'blog.LifePage': return PageType.Life;
    case 'blog.MomentPage': return PageType.Moment;
    case 'blog.PerspectivePage': return PageType.Perspective;
    case 'blog.ProjectPage': return PageType.Project;
    default: return PageType.General;
  }
}

export async function fetchData<T>(
  dataFetch: Promise<T>,
  dataCallback: (data: T) => void,
  completionCallback: () => void,
  errorCallback: (e: AxiosError) => void,
): Promise<T | null> {
  var ret = null;
  try {
    ret = await dataFetch;
    dataCallback(ret);
  }
  catch (err) {
    errorCallback(err);
  };
  completionCallback();
  return ret;
}