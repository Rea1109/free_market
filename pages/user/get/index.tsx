import { withAuth } from "../../../src/components/commons/hocs/withAuth";
import GetUser from "../../../src/components/units/user/get/GetUser.container";

function GetUserPage() {
  return <GetUser />;
}

export default withAuth(GetUserPage);
