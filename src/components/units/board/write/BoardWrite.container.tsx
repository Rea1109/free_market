import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState, useRef } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "./BoardWrite.queries";
import { IBoardWriteProps, IUpdateBoardInput } from "./BoardWrite.types";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import { Modal } from "antd";
import { checkUploadFile } from "./BoardWrite.validation";

declare const window: Window &
  typeof globalThis & {
    daum: any;
  };

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [myImages, setMyImages] = useState<string[]>([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);
  const [boardInput, setBoardInput] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
    youtubeUrl: "",
  });
  const [boardAddress, setBoardAddress] = useState({
    address: "",
    zipcode: "",
    addressDetail: "",
  });

  const [errorWriter, setErrorWriter] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");

  const onChangeBoardInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoardInput({
      ...boardInput,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === "writer") setErrorWriter("");
    if (event.target.name === "password") setErrorPassword("");
    if (event.target.name === "title") setErrorTitle("");
    if (event.target.name === "contents") setErrorContent("");
  };
  const onChangeBoardAddress = (event: ChangeEvent<HTMLInputElement>) =>
    setBoardAddress({
      ...boardAddress,
      [event.target.name]: event.target.value,
    });
  const addBoard = async () => {
    if (isCheck()) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              ...boardInput,
              boardAddress: {
                ...boardAddress,
              },
              images: myImages,
            },
          },
        });
        Modal.success({ title: "????????? ????????? ?????? ???????????????." });
        router.push(`/boards/${result.data?.createBoard._id}`);
      } catch (error) {
        error instanceof Error && console.log(error.message);
        Modal.error({ title: "error.message" });
      }
    }
  };
  const editBoard = async () => {
    console.log(props.data?.fetchBoard.images);
    const updateBoardInput: IUpdateBoardInput = {};

    if (boardInput.writer !== "") updateBoardInput.writer = boardInput.writer;
    if (boardInput.title !== "") updateBoardInput.title = boardInput.title;
    if (boardInput.contents !== "")
      updateBoardInput.contents = boardInput.contents;
    if (boardInput.youtubeUrl !== "")
      updateBoardInput.youtubeUrl = boardInput.youtubeUrl;
    if (boardAddress.zipcode !== "" || boardAddress.addressDetail !== "") {
      updateBoardInput.boardAddress = {};
      if (boardAddress.zipcode === "" && boardAddress.addressDetail !== "") {
        updateBoardInput.boardAddress.addressDetail =
          boardAddress.addressDetail;
      } else {
        updateBoardInput.boardAddress.zipcode = boardAddress.zipcode;
        updateBoardInput.boardAddress.address = boardAddress.address;
      }
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: String(router.query.boardId),
          password: boardInput.password,
          updateBoardInput: updateBoardInput,
        },
      });

      Modal.success({ title: "????????? ????????? ?????? ???????????????." });
      console.log(result);
      router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error: any) {
      console.log(error.message);
      Modal.error({ title: error.message });
    }
  };
  const getAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        let addr = ""; // ?????? ??????
        let extraAddr = ""; // ???????????? ??????

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[???|???|???]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        }
        setBoardAddress({
          ...boardAddress,
          zipcode: data.zonecode,
          address: addr,
        });
        document.getElementById("extraAddr")?.focus();
      },
    }).open();
  };

  const isCheck = () => {
    let check = true;
    if (!boardInput.writer) {
      setErrorWriter("???????????? ??????????????????");
      check = false;
    }
    if (!boardInput.password) {
      setErrorPassword("??????????????? ??????????????????");
      check = false;
    }
    if (!boardInput.title) {
      setErrorTitle("????????? ??????????????????");
      check = false;
    }
    if (!boardInput.contents) {
      setErrorContent("????????? ??????????????????");
      check = false;
    }
    return check;
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const myFile = checkUploadFile(event.target.files?.[0]);
    if (!myFile) return;
    const result = await uploadFile({
      variables: {
        file: myFile,
      },
    });

    console.log(result.data.uploadFile.url);
    setMyImages((prev) => [...prev, result.data.uploadFile.url]);
  };
  const onClickMyImage = () => {
    console.log(myImages.length);

    if (myImages.length > 2) {
      Modal.warning({ title: "???????????? ?????? 3????????? ?????? ???????????????." });
      return;
    }
    fileRef.current?.click();
  };

  return (
    <BoardWriteUI
      onChangeBoardInput={onChangeBoardInput}
      addBoard={addBoard}
      editBoard={editBoard}
      getBoard={() => router.push(`/boards/${router.query.boardId}`)}
      errorWriter={errorWriter}
      errorPassword={errorPassword}
      errorTitle={errorTitle}
      errorContent={errorContent}
      isEdit={props.isEdit}
      getAddr={getAddr}
      onChangeBoardAddress={onChangeBoardAddress}
      boardAddress={boardAddress}
      data={props.data}
      onChangeFile={onChangeFile}
      onClickMyImage={onClickMyImage}
      fileRef={fileRef}
      myImages={myImages}
    />
  );
}
