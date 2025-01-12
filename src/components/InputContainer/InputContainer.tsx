import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const InputContainer: FC<Props> = ({ children }) => {
  return <div className="input-container">{children}</div>;
};

export default InputContainer;
