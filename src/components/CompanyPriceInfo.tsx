import React from "react";
import { CompanyDetail } from "../types";

interface Props {
  company: CompanyDetail;
}

const CompanyPriceInfo = React.memo(({ company }: Props) => {
  const renderChangeBlock = () => {
    const isNagative = company.change < 0 ? true : false;
    const change = Math.abs(company.change);
    const changePercent = Math.abs(company.changePercent);
    return (
      <div className={`change-price-block ${isNagative ? "down-price" : ""}`}>
        <span>
          {isNagative ? "-" : "+"}${change}
        </span>
        &nbsp;
        <span>({changePercent.toFixed(2)}%)</span>
      </div>
    );
  };

  return (
    <div className="company-info-block">
      <div className="company-stock-price">${company.iexRealtimePrice}</div>
      {renderChangeBlock()}
    </div>
  );
});

export default CompanyPriceInfo;
