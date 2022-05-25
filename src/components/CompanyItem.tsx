import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CompanyDetail } from "../types";
import CompanyPriceInfo from "./CompanyPriceInfo";

interface Props {
  company: CompanyDetail;
}

const CompanyItem = React.memo(({ company }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      className="company-card"
      onClick={() => navigate(`/${company.symbol}`)}
    >
      <div className="company-card-body">
        <div className="company-name-block">
          <h4>{company.companyName}</h4>
        </div>
        <CompanyPriceInfo company={company} />
      </div>
    </Card>
  );
});

export default CompanyItem;
