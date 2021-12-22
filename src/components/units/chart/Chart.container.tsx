import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  //   CategoryScale,
  //   LinearScale,
  //   BarElement,
  //   Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../../src/commons/types/generated/types";

const FETCH_USED_ITEMS_COUNT_IPICKED = gql`
  query fetchUseditemsCountIPicked {
    fetchUseditemsCountIPicked
  }
`;

const FETCH_USED_ITEMS_COUNT_ISOLD = gql`
  query fetchUseditemsCountISold {
    fetchUseditemsCountISold
  }
`;

const FETCH_USED_ITEMS_COUNT_IBOUGHT = gql`
  query fetchUseditemsCountIBought {
    fetchUseditemsCountIBought
  }
`;

export default function Chart() {
  const { data: pickCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountIPicked">
  >(FETCH_USED_ITEMS_COUNT_IPICKED);

  const { data: soldCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountISold">
  >(FETCH_USED_ITEMS_COUNT_ISOLD);

  const { data: boughtCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountIBought">
  >(FETCH_USED_ITEMS_COUNT_IBOUGHT);

  //   ChartJS.register(
  //     CategoryScale,
  //     LinearScale,
  //     BarElement,
  //     Title,
  //     Tooltip,
  //     Legend
  //   );
  ChartJS.register(ArcElement, Tooltip, Legend);

  const labels = ["찜한 상품 수", "판매한 상품 수", "구매한 상품 수"];

  const data = {
    labels,
    datasets: [
      {
        label: "count",
        data: [
          pickCount?.fetchUseditemsCountIPicked,
          soldCount?.fetchUseditemsCountISold,
          boughtCount?.fetchUseditemsCountIBought,
        ],
        backgroundColor: ["#00b6d8", "gray", "gold"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        // display: true,
        // text: "Bar Chart Test",
      },
    },
  };

  return <Doughnut options={options} data={data} />;
}
