interface Page {
  id: number;
  title: string;
  content?: string;
}

interface ProjectBase {
  id: number;
  name: string;
  description?: string;
  tags?: string[];
  notes?: string;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  owner?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  pages?: Page[];
}

export type Project = ProjectBase & {
  [key: string]: unknown;
};
