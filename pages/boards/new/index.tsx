// 등록페이지
import { withAuth } from "../../../src/components/commons/hocs/withAuth";
import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";

// export default function NewBoardPage() {
//   return <BoardWrite />;
// }

const NeBoardPage = () => {
  return <BoardWrite />;
};

export default withAuth(NeBoardPage);
