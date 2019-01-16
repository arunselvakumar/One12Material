export interface PostModel {
  title: string;
  source: string;
  description: string;
  content: string;
  tags: string[];
  postedBy: string;
  isDeleted: boolean;
}
