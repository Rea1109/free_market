import BasketUI from "./Basket.presenter";
import { useState, useEffect } from "react";
import { IUseditem } from "../../../../commons/types/generated/types";

export default function Basket() {
  const [basketItems, setBasketItems] = useState<IUseditem[]>([]);

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasketItems(baskets);
  }, []);

  const deleteBaskets = (id: any) => () => {
    const baskets = JSON.parse(localStorage.getItem("basket") || "[]");
    const newBaskets = baskets.filter((item: any) => item._id !== id);
    localStorage.setItem("basket", JSON.stringify(newBaskets));
    setBasketItems(newBaskets);
  };

  return <BasketUI basketItems={basketItems} deleteBaskets={deleteBaskets} />;
}
