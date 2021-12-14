import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types";
import AnswerList from "../answerList/AnswerList.container";

const FETCH_USED_ITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($page: Int, $useditemId: ID!) {
    fetchUseditemQuestions(page: $page, useditemId: $useditemId) {
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

export default function QuestionList() {
  const router = useRouter();

  const { data: useditemQuestions, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      useditemId: String(router.query.usedItemId),
    },
  });

  const onLoadMore = () => {
    console.log(useditemQuestions?.fetchUseditemQuestions);
    if (!useditemQuestions) return;

    fetchMore({
      variables: {
        page:
          Math.ceil(useditemQuestions.fetchUseditemQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestions)
          return {
            fetchUseditemQuestions: [...prev.fetchUseditemQuestions],
          };

        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  return (
    <>
      <h3>문의하기</h3>
      <div>
        <input type="text" placeholder="문의내용" />
        <button>문의 등록하기</button>
      </div>

      {useditemQuestions?.fetchUseditemQuestions.map((el) => (
        <div key={el._id} style={{ border: "3px solid black" }}>
          <h2>{el._id}</h2>
          <h3>{el.user.name}</h3>
          <span>{el.contents}</span>
          <AnswerList questionId={el._id} />
        </div>
      ))}
      <button onClick={onLoadMore}>더보기</button>
    </>
  );
}
