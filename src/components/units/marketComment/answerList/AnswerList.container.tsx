import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../commons/types/generated/types";

const FETCH_USED_ITEM_QUESTION_ANSWERS = gql`
  query fetchUseditemQuestionAnswers($page: Int, $useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(
      page: $page
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      user {
        _id
        email
        name
      }
    }
  }
`;

export default function AnswerList(props: any) {
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: String(props.questionId) },
  });

  console.log(data?.fetchUseditemQuestionAnswers);

  return (
    <div style={{ border: "2px solid gold" }}>
      <h3>답글목록</h3>
      <input type="text" placeholder="답변내요" />
      <button>답변 등록하기</button>
      {data?.fetchUseditemQuestionAnswers.map((el) => (
        <div key={el._id}>
          <span>{el.contents} / </span>
          <span>{el.user.name}</span>
        </div>
      ))}
    </div>
  );
}
