import { useRouter } from "next/router";
import NavigationUI from "./Navigation.presenter";

export default function Navigation() {
  const router = useRouter();
  const onClickMove = (page: string) => () => {
    router.push(page);
  };

  return <NavigationUI onClickMove={onClickMove} />;
}
