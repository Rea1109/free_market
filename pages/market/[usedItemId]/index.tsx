import { withAuth } from "../../../src/components/commons/hocs/withAuth";
import UsedItemGet from "../../../src/components/units/market/get/UsedItemGet.container";

function UsedItemGetPage() {
  return <UsedItemGet />;
}

export default withAuth(UsedItemGetPage);
