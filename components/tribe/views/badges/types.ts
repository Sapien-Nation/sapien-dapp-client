export interface DraftBadge {
  id: string;
  avatar: string;
  color: string;
  description: string;
  name: string;
  members: Array<{ id: string; walletAddress: string }>;
  permissions: Array<string>;
}
