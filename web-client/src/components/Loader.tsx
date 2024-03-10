import classNames from "classnames";
import styles from "./Loader.module.css";

export const Loader = ({ className }: { className?: string }) => {
  return <div className={classNames(styles.loader, className)}></div>;
};

export const FullPageLoader = () => {
  return (
    <div className="flex justify-center items-center inset-0 fixed z-[1000]">
      <Loader />
    </div>
  );
};
