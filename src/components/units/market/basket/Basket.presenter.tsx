export default function BasketUI(props: any) {
  return (
    <>
      <h1>Basket List</h1>
      {props.basketItems.map((el: any) => (
        <div key={el._id}>
          <span>{el.name}</span>/<span>{el.price}</span>
          <button onClick={props.deleteBaskets(el._id)}>삭제</button>
        </div>
      ))}
    </>
  );
}
