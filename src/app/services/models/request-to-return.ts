export interface RequestToReturn {
  projectName?: string;

  title?: string;
  state?: "Pending" | "Accepted" | "Canceled";
  fullName?:string;
  userId?:number;
  purpose?:string;
  createdAt?:string;
  userType?:string;
}
