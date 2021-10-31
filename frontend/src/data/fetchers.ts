import axios from 'axios';
import {
  IndividualData,
  LifeData,
  MomentData,
  PageData,
  ProjectData,
  Sitemap,
  SiteTree,
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

// endpoint enum values should match the registered endpoints in yolohlife/api.py
const enum Endpoint {
  Individuals = 'individuals',
  Perspectives = 'perspectives',
  Projects = 'projects',
}

async function getData(endpointName: Endpoint, id: number): Promise<any> {
  const res = await axios(`/api/v2/${endpointName}/${id}/?format=json`);
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
  return getData(Endpoint.Individuals, id);
}

export async function getLifes(individualId: number): Promise<LifeData[]> {
  return [
    { ...dummyPage, name: 'Career', description: 'career in tech industry, as an engineer & leader.' },
    { ...dummyPage, name: 'Adventures', description: 'Exciting journeys, DIY projects, challenges to self.' },
    { ...dummyPage, name: 'Lifestyle', description: 'Pursuit of a fuller life.' },
    { ...dummyPage, name: 'Music & Arts', description: 'Ocassional fun from making music & arts.' },
  ];
}

export async function getMoments(individualId: number): Promise<MomentData[]> {
  return [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
      author: 'swabdesign',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
      author: 'Pavel Nekoranec',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
      author: 'Charles Deluvio',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
      author: 'Christian Mackie',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
      author: 'Darren Richardson',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
      author: 'Taylor Simpson',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
      author: 'Ben Kolde',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
      author: 'Philipp Berndt',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
      author: 'Jen P.',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
      author: 'Douglas Sheppard',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
      author: 'Fi Bell',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
      author: 'Hutomo Abrianto',
    },
  ];
}

export async function getProjects(individualId: number): Promise<ProjectData[]> {
  return [
    {
      title: 'San Francisco – Oakland Bay Bridge, United States sdfdsafajjjjjjjjjjjklsdkjfifdfjidfj kfdlfjl',
      description: 'sdfdsfdsafwasdg',
      coverPath:
        'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      title: 'Bird',
      description: 'sdfdsfdsafwasdg',
      coverPath:
        'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      title: 'Bali, Indonesia',
      description: 'sdfdsfdsafwasdg',
      coverPath:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
    },
    {
      title: 'Goč, Serbia',
      description: 'sdfdsfdsafwasddfffffffffffffffffffffffffffffffffffffffjdslakjgsajdgodsaijgosadjgoisdajgiodsajgoisajdgoidsajgaslkdjfklsdajflasddnmvlasndv,dsa,fmasdjfpwjfwaefk.,asdmf.,sadfm,dmfmlwsdkdfjkdfllllllllllllllllllllllllllllllllllllllllllllllllljfidosjfskldfdsanm.gsa,dgmsgkljskdgjowjig',
      coverPath:
        'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
  ];
}
