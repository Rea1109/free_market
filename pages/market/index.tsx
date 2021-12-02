import { withAuth } from "../../src/components/commons/hocs/withAuth";
import MarketList from "../../src/components/units/market/list/MarketList.container";

function MarketListPage() {
  return <MarketList />;
}

export default withAuth(MarketListPage);
