import * as z from "zod";

export const CheckData = z.object({
  Check: z
    .object({
      Id: z.string(),
      Text: z.string(),
    })
    .nullable(),
  CheckGroup: z.object({
    Id: z.string(),
  }),
  ResultValues: z.array(
    z.object({
      Value: z.string(),
      DisplayText: z.string().nullable(),
    }),
  ),
  Actions: z.array(
    z.object({
      ActionPrefix: z.string(),
      ActionText: z.string(),
    }),
  ),
  Photos: z.array(
    z.object({
      Caption: z.string(),
      FileId: z.string(),
    }),
  ),
});

export const TaskInformation = z.object({
  TaskId: z.string(),
  ChecklistId: z.string(),
  Properties: z.array(
    z.object({
      Id: z.string(),
      PropertyId: z.string(),
      Name: z.string(),
      Value: z.string().optional(),
    }),
  ),
});

export const DataModel = z.object({
  _id: z.string(),
  CHECK_GROUPS: z.array(
    z.object({
      CheckGroupId: z.string(),
      CheckGroupPrefix: z.string().nullable(),
      Order: z.string().nullable(),
      Name: z.string(),
      Checks: z.array(
        z.object({
          CheckId: z.string(),
          Prefix: z.string().nullable(),
          Order: z.string(),
        }),
      ),
    }),
  ),
  CHECKLIST: z.array(
    z.object({
      ChecklistId: z.string(),
      TaskTypes: z.array(
        z.object({
          TaskTypeId: z.string(),
          Name: z.string(),
        }),
      ),
    }),
  ),
});

export const RequestSchema = z.object({
  checkResults: z.array(CheckData),
  taskInformation: z.tuple([TaskInformation]),
  dataModel: DataModel,
});

export const DataSnapshotSchema = z.object({
  _id: z.string(),
  Data: z.object({
    checks: z.array(CheckData),
    tasks: z.tuple([TaskInformation]),
  }),
  Models: z.tuple([
    z.object({
      _id: z.any(), // ObjectId type
    }),
  ]),
});
