import { IQuery, IUseditem } from "../../../../commons/types/generated/types";
import { SyntheticEvent } from "react";

export interface IMarketListUIProps {
  onLoad: () => void;
  onMoveMarketNew: () => void;
  bestUsedItems?: Pick<IQuery, "fetchUseditemsOfTheBest">;
  usedItems?: Pick<IQuery, "fetchUseditems">;
  onClickBasket: (el: IUseditem) => () => void;
  onClickGetItem: (id: string) => () => void;
  handleErrorImg: (event: SyntheticEvent) => void;
}
