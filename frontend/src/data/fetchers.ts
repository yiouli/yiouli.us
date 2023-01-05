import axios from 'axios';
import {
  ArticleData,
  ImageData,
  IndividualData,
  PageData,
  PageType,
  Sitemap,
  SiteTree,
  TopicData,
} from "./interfaces";
import { buildSiteTrees, getCurrentSiteTree } from './utils';

async function getPageData(pageType: PageType, filter_query: string = '', id?: number): Promise<any> {
  const queryString = id == undefined
    ? `/api/v2/pages/?format=json&type=${pageType}&fields=*`
    : `/api/v2/pages/${id}/?format=json&type=${pageType}&fields=*`
  const res = await axios(queryString + filter_query);
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
  return getPageData(PageType.Individual, '', id);
}

export async function getTopics(): Promise<TopicData[]> {
  return getPageData(PageType.Topic).then(rawData => {
      return rawData.items;
    });
}

export async function getArticles(topicId?: number): Promise<ArticleData[]> {
  return getPageData(
    PageType.Article,
    topicId == undefined? '': `&topics=${topicId}`
  ).then(rawData => {
    return rawData.items;
  });
}

export async function getImageData(id: number): Promise<ImageData> {
  const res = await axios(`/api/v2/images/${id}/?format=json`);
  return res.data;
}

export async function getImageUrl(id: number): Promise<string> {
  const data = await getImageData(id);
  return data.meta.download_url;
}
