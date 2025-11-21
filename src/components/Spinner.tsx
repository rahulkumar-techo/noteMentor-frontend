
import React from "react";
import {
  BallTriangle,
  Bars,
  Grid
} from "react-loader-spinner";

type SpinnerType = "ballTriangle" | "bars" | "grid";

type Props = {
  spinnerType: SpinnerType;
  size?: number;
  color?: string;
};

const Spinner: React.FC<Props> = ({
  spinnerType="ballTriangle",
  size = 80,
  color = "#4fa94d",
}) => {
  const commonProps = {
    height: size,
    width: size,
    color,
    visible: true,
    ariaLabel: `${spinnerType}-loading`,
  };

  const renderSpinner = () => {
    switch (spinnerType) {
      case "ballTriangle":
        return <BallTriangle {...commonProps} />;
      case "bars":
        return <Bars {...commonProps} />;
      case "grid":
        return <Grid {...commonProps} />;
      default:
        return <BallTriangle {...commonProps} />;
    }
  };

  return <div className="flex items-center justify-center">{renderSpinner()}</div>;
};

export default Spinner;
