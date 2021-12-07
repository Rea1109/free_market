import UsedItemWrite from "../../../../src/components/units/market/write/UsedItemWrite.container";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEM } from "../../../../src/components/units/market/get/UsedItemGet.queries";

export default function UpdateUsedItemPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: {
      useditemId: router.query.usedItemId,
    },
  });
  console.log(data);
  return <UsedItemWrite isEdit={true} data={data} />;
}
