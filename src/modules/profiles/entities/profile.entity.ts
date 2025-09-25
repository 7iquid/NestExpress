export interface Profile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  interests?: string[];
  location?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
