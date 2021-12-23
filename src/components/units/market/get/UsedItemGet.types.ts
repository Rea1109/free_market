import { IQuery, IUseditem } from "../../../../commons/types/generated/types";

export interface UsedItemGetUIProps {
  data: Pick<IQuery, "fetchUseditem"> | undefined;
  pickItems: Pick<IQuery, "fetchUseditemsIPicked"> | undefined;
  userInfo: Pick<IQuery, "fetchUserLoggedIn"> | undefined;
  isPick: boolean;
  onClickEdit: () => () => void;
  onClickPurchase: (itemId: string | undefined) => () => void;
  onClickBasket: (el: IUseditem | undefined) => () => void;
  onClickPick: (itemId: string | undefined) => () => void;
  onClickDelete: (itemId: string | undefined) => () => void;
}
