export enum PageType {
  Individual,
  Life,
  Perspective,
  Moment,
  Project,
  General,
}

export interface Metadata {
  html_url: string;
}

export interface PageData {
  id: number;
  title: string;
  meta: Metadata;
}

export type Sitemap = { [pageId: number]: PageData };

export type SiteTree = {
  id: number,
  url: string,
  page: PageData,
  children: SiteTree[],
}

// interface definition should match APIFields defined on models in blog/models.py
export interface IndividualData extends PageData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  about: string;
  avatar: string | null;
}

export interface LifeData extends PageData {
  name: string;
  description: string;
}

export interface ProjectData {

}

export interface PerspectiveData {

}