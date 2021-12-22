import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types";
import AnswerList from "../answerList/AnswerList.container";
import { useState, ChangeEvent } from "react";
import { Modal } from "antd";
import QuestionListPresenterItem from "./QuestionList.presenterItem";

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

const CREATE_USED_ITEM_QUESTION = gql`
  mutation createUseditemQuestion(
    $useditemId: ID!
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
  ) {
    createUseditemQuestion(
      useditemId: $useditemId
      createUseditemQuestionInput: $createUseditemQuestionInput
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

export default function QuestionList() {
  const router = useRouter();

  const [contents, setContents] = useState("");
  const [createQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);

  const {
    data: useditemQuestions,
    fetchMore,
    refetch,
  } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      useditemId: String(router.query.usedItemId),
    },
  });

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickAddQuestion = async () => {
    try {
      await createQuestion({
        variables: {
          createUseditemQuestionInput: { contents },
          useditemId: String(router.query.usedItemId),
        },
      });
      refetch();
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

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
        <input type="text" placeholder="문의내용" onChange={onChangeContents} />
        <button onClick={onClickAddQuestion}>문의 등록하기</button>
      </div>

      {useditemQuestions?.fetchUseditemQuestions.map((el) => (
        <div key={el._id} style={{ border: "3px solid black" }}>
          <QuestionListPresenterItem el={el} refetch={refetch} />

          <AnswerList questionId={el._id} />
        </div>
      ))}
      <button onClick={onLoadMore}>더보기</button>
    </>
  );
}
