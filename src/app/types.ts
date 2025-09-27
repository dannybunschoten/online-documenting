import * as z from "zod";
import * as schemas from "../lib/schemas";

type TaskInformation = z.infer<typeof schemas.TaskInformation>;
type CheckData = z.infer<typeof schemas.CheckData>;
export type DataModel = z.infer<typeof schemas.DataModel>;

export type DataSnapshot = TaskInformation & {
  checks: CheckData[];
} & { _id: string };

export type CheckDataOrdered = Omit<CheckData, "Check"> & {
  Check: CheckData["Check"] & {
    Prefix: string;
    Order: string;
  };
};

export type CheckList = {
  title?: string;
  checkCode?: string;
  startDate?: string;
  employeeName?: string;
  machineKind?: string;
  owner?: string;
  customerOrderNumber?: string;
  manufacturer?: string;
  modelType?: string;
  serialNumber?: string;
  buildYear?: string;
  checks: Array<{
    prefix: string | null;
    sortOrder: string;
    title: string;
    checks: CheckDataOrdered[];
  }>;
};
