import axios from 'axios';
import {
  IndividualData,
  PageData,
  PerspectiveData,
  ProjectData,
  Sitemap,
  SiteTree,
} from "./interfaces";

// endpoint enum values should match the registered endpoints in yolohlife/api.py
const enum Endpoint {
  Individuals = 'individuals',
  Perspectives = 'perspectives',
  Projects = 'projects',
}

async function getData(endpointName: Endpoint, id: Number): Promise<any> {
  const res = await axios(`/api/v2/${endpointName}/${id}/?format=json`);
  return res.data;
}

function buildSiteTrees(sitemap: Sitemap): SiteTree[] {
  function dfs(pageId: number, page: PageData, trees: SiteTree[]) {
    trees.forEach((t) => {
      if (page.meta.html_url.startsWith(t.url)) {
        dfs(pageId, page, t.children);
        return;
      }
    });
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

export async function getSitemap(): Promise<Sitemap> {
  const res = await axios(`/api/v2/pages/?format=json`);
  return res.data.items.reduce(
    (a: Sitemap, v: PageData) => (
      { ...a, [v.id]: v}
    ), {});
}

export async function getSiteTrees(): Promise<SiteTree[]> {
  const sitemap = await getSitemap();
  return buildSiteTrees(sitemap);
}

export async function getIndividual(id: Number): Promise<IndividualData> {
  return getData(Endpoint.Individuals, id);
}

export async function getPerspective(id: Number): Promise<PerspectiveData> {
  return getData(Endpoint.Perspectives, id);
}

export async function getProject(id: Number): Promise<ProjectData> {
  return getData(Endpoint.Projects, id);
}
