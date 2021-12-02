import { ChangeEvent } from "react";

export interface ILoginUIProps {
  onChageEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  onChagePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
}
