export interface PostModel {
  id: string;
  title: string;
  source: string;
  description: string;
  content: string;
  tags: string[];
  postedBy: string;
  isDeleted: boolean;
}
