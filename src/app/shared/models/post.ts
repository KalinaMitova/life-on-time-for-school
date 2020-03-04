export enum MediaType {
  'image',
  'video',
  'audio'
}

export interface Post {
  id: string,
  date: string,
  title: string;
  imageUrl?: string;
  audioUrl?: string;
  content: string;
  shortContent?: string;
  link?: string;
  mediaType?: MediaType;
  mediaId?: string;
}
