import React from 'react';
import Biography from './biography';
import LifeMenu from './life-menu';
import MomentGrid from './moment-grid';
import PageContainer, { Section } from './page-container';
import ProjectCarousel from './project-carousel';

export interface IndividualProps {
  pageId: number;
}

export default function Individual(props: IndividualProps) {
  return (
    <PageContainer>
        <Biography pageId={props.pageId} />
        <Section title='About Me'>
          <LifeMenu individualId={props.pageId} />
        </Section>
        <Section title='Projects'>
          <ProjectCarousel individualId={props.pageId} />
        </Section>
        <Section title='Moments'>
          <MomentGrid individualId={props.pageId} />
        </Section>
    </PageContainer>
  );
}