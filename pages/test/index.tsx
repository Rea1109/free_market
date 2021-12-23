import { KeyboardEvent } from "react";

export default function TestPage() {
  // const [tags, setTags] = useState([]);

  const onKeyUpTest = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") console.log(e.target.value);
  };

  return (
    <>
      <div>test page</div>
      <input type="text" onKeyPress={onKeyUpTest} />
    </>
  );
}
