import { IQuery } from "../../../../commons/types/generated/types";
import { SyntheticEvent, Dispatch, SetStateAction } from "react";

export interface IMarketListUIProps {
  onLoad: () => void;
  onMoveMarketNew: () => void;
  bestUsedItems?: Pick<IQuery, "fetchUseditemsOfTheBest">;
  usedItems?: Pick<IQuery, "fetchUseditems">;
  setKeyWord: Dispatch<SetStateAction<string>>;
  onClickGetItem: (id: string) => () => void;
  handleErrorImg: (event: SyntheticEvent) => void;
  onClickSearch: () => void;
}
