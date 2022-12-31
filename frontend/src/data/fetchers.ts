import axios from 'axios';
import {
  ArticleData,
  IndividualData,
  PageData,
  PageType,
  Sitemap,
  SiteTree,
  TopicData,
} from "./interfaces";
import { buildSiteTrees, getCurrentSiteTree } from './utils';

const dummyPage: PageData = {
  id: 0,
  title: 'dummy page',
  meta: {
    html_url: 'http://localhost:8000/',
    type: 'blog.DummyPage'
  }
};

async function getData(pageType: PageType, id?: number): Promise<any> {
  const queryString = id == null
    ? `/api/v2/pages/?format=json&type=${pageType}&fields=*`
    : `/api/v2/pages/${id}/?format=json&type=${pageType}&fields=*`
  const res = await axios(queryString);
  return res.data;
}

export async function getSitemap(): Promise<Sitemap> {
  const res = await axios(`/api/v2/pages/?format=json`);
  return res.data.items.reduce(
    (a: Sitemap, v: PageData) => (
      { ...a, [v.id]: v }
    ), {});
}

export async function getSiteTree(currentPageId: number): Promise<SiteTree> {
  const sitemap = await getSitemap();
  const trees = buildSiteTrees(sitemap);
  return getCurrentSiteTree(currentPageId, trees);
}

export async function getIndividual(id: number): Promise<IndividualData> {
  return getData(PageType.Individual, id);
}

export async function getTopics(): Promise<TopicData[]> {
  return getData(PageType.Topic).then(rawData => {
      return rawData.items;
    });
}

export async function getArticles(): Promise<ArticleData[]> {
  return getData(PageType.Article).then(rawData => {
    return rawData.items;
  });
}
