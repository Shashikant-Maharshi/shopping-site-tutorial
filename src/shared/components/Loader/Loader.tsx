import { ImSpinner } from "react-icons/im";

import "./loader.scss";

type Props = {
  message: string;
}

const Loader = ({ message }: Props) => {
  return (
    <div className='loader'>
      <ImSpinner className="rotating" />
      <span className="loader__message">{message}</span>
    </div>
  )
}

export default Loader;
