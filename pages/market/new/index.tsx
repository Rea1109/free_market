import { withAuth } from "../../../src/components/commons/hocs/withAuth";
import UsedItemWrite from "../../../src/components/units/market/write/UsedItemWrite.container";

function NewUsedItemPage() {
  return <UsedItemWrite />;
}

export default withAuth(NewUsedItemPage);
