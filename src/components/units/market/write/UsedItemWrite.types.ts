import { IQuery } from "../../../../commons/types/generated/types";

export interface FormValues {
  name: string;
  contents: string;
  price: number;
  remarks: string;
}

export interface IUsedItemWriteProps {
  isEdit?: boolean;
  data?: Pick<IQuery, "fetchUseditem"> | undefined;
}
