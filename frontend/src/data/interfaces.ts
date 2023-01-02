export enum PageType {
  // order matter here, it determines page ordering in sitemap menu.
  Individual = 'blog.IndividualPage',
  Topic = 'blog.TopicPage',
  Article = 'blog.ArticlePage',
  General = 'blog.Page',
}

// the enum values should match the string name set in stream field of django models
export enum BlockType {
  Markdown = 'markdown',
  ImageWithCaption = 'image_with_caption',
}

export interface PageMetadata {
  html_url: string,
  type: PageType,
}

export interface PageData {
  id: number,
  title: string,
  meta: PageMetadata,
}

export interface ImageMetaData {
  type: string,
  detail_url: string,
  download_url: string,
}

export interface ImageData {
  id: number,
  meta: ImageMetaData,
  title: string,
}

export interface ImageWithCaptionBlock {
  caption: string,
  image: number,
}

export interface BlockData {
  type: BlockType,
  // all type of block values should be outlined here to avoid error
  value: string | ImageWithCaptionBlock,
  id: string,
}

export type Sitemap = { [pageId: number]: PageData };

export type SiteTree = {
  id: number,
  url: string,
  relativePath: string,
  page: PageData,
  children: SiteTree[],
}

// interface definition should match APIFields defined in blog.models.IndividualPage
export interface IndividualData extends PageData {
  first_name: string,
  last_name: string,
  email?: string,
  phone?: string,
  about: string,
  avatar: ImageData,
}

// interface definition should match APIFields defined in blog.models.TopicPage
export interface TopicData extends PageData {
  description: string,
}

// interface definition should match APIFields defined in blog.models.ArticlePage
export interface ArticleData extends PageData {
  date: string,
  date_display: string,
  topics: PageData[],
  content: BlockData[],
}