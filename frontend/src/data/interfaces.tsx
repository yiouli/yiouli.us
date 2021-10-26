export interface Metadata {
  html_url: string;
}

// interface definition should match APIFields defined on models in blog/models.py
export interface IndividualData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  about: string;
  metadata: Metadata;
}

export interface ProjectData {

}

export interface PerspectiveData {

}
