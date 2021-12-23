import UsedItemWrite from "../../../../src/components/units/market/write/UsedItemWrite.container";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEM } from "../../../../src/components/units/market/get/UsedItemGet.queries";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../src/commons/types/generated/types";

export default function UpdateUsedItemPage() {
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.usedItemId),
    },
  });
  return <UsedItemWrite isEdit={true} data={data} />;
}
