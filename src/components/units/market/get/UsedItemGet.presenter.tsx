import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_USED_ITEM } from "./UsedItemGet.queries";

export default function UsedItemGetUI() {
  const router = useRouter();

  const { data } = useQuery(FETCH_USED_ITEM, {
    variables: {
      useditemId: router.query.usedItemId,
    },
  });

  console.log(data);

  return (
    <>
      <div>상품 상세 정보 페이지</div>
      <div>{router.query.usedItemId}</div>
    </>
  );
}
