import { withAuth } from "../../../src/components/commons/hocs/withAuth";
import GetUser from "../../../src/components/units/user/get/GetUser.container";

// export default function GetUserPage() {
//   return <GetUser />;
// }

function GetUserPage() {
  return <GetUser />;
}

export default withAuth(GetUserPage);
