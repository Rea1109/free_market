import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../src/commons/types/generated/types";

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

export default function TestPage() {
  const { data: pickCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountIPicked">
  >(FETCH_USED_ITEMS_COUNT_IPICKED);

  const { data: soldCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountISold">
  >(FETCH_USED_ITEMS_COUNT_ISOLD);

  const { data: boughtCount } = useQuery<
    Pick<IQuery, "fetchUseditemsCountIBought">
  >(FETCH_USED_ITEMS_COUNT_IBOUGHT);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = ["찜한 상품 수", "판매한 상품 수", "구매한 상품 수"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          pickCount?.fetchUseditemsCountIPicked,
          soldCount?.fetchUseditemsCountISold,
          boughtCount?.fetchUseditemsCountIBought,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        display: true,
        text: "Bar Chart Test",
      },
    },
  };

  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
