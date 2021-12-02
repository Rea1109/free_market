import { useRouter } from "next/router";
export default function MarketListUI() {
  const router = useRouter();

  return (
    <>
      <div>마켓리스트 페이지</div>
      <button onClick={() => router.push("/market/new")}>상품 등록하기</button>
    </>
  );
}
