export interface Lead {
  id?: string;
  userId?: string;
  branchId: string;
  type: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  metaData?: { [key: string]: string | undefined };
}
