import Head from "next/head";

export default function GetUserUI(props: any) {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <div>마이 페이지</div>
      <div>
        <span>{props.data?.fetchUserLoggedIn.name}</span> <br />
        <span>{props.data?.fetchUserLoggedIn.email}</span> <br />
        <span>{props.data?.fetchUserLoggedIn.userPoint.amount}</span>
        <br />
        <button onClick={props.onClickPayMent}>충전하기</button>
      </div>
    </>
  );
}
