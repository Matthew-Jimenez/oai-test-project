import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CompanyPriceInfo from "../components/CompanyPriceInfo";
import { useIex } from "../context/IEXProvider";
import { CompanyData, CompanyDetail } from "../types";

const CompanyPage = React.memo(() => {
  const client = useIex();
  const params = useParams();
  const [companyDetail, setCompanyDetail] = useState<CompanyData>();
  const [companyQuote, setCompanyQuote] = useState<CompanyDetail>();
  const [lastDayPrice, setLastDayPrice] = useState<number>(0);
  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  const getQuote = () => {
    if (params && params["symbol"]) {
      client.getQuote(params["symbol"]).then((res) => {
        if (res && res["status"] === 200 && res["data"]) {
          setCompanyQuote(JSON.parse(res["data"]));
        }
      });
    }
  };

  const getCompany = (symbol: string) => {
    client.getCompany(symbol).then((res) => {
      if (res && res["status"] === 200 && res["data"]) {
        setCompanyDetail(JSON.parse(res["data"]));
      }
    });
  };

  const getHistoricalPrices = (symbol: string) => {
    client.getHistoricalPrices(symbol).then((res) => {
      if (res && res["status"] === 200 && res["data"]) {
        const historicalPrices = JSON.parse(res["data"]);
        if (historicalPrices.length > 0) {
          setLastDayPrice(historicalPrices[0]["close"]);
        }
      }
    });
  };

  useEffect(() => {
    if (params && params["symbol"]) {
      getCompany(params["symbol"]);
      getHistoricalPrices(params["symbol"]);
      getQuote();
      interval.current = setInterval(() => {
        getQuote();
      }, 10000);
    }
    return () => clearInterval(interval.current as NodeJS.Timeout);
  }, [params]);

  const getOneYearChange = (companyQuote: CompanyDetail) => {
    const changeValue = companyQuote.iexRealtimePrice - lastDayPrice;
    const isNagative = changeValue < 0 ? true : false;
    const changePercent = Math.abs(100 * (changeValue / lastDayPrice)).toFixed(
      2
    );
    return (
      <div className={`change-price-block ${isNagative ? "down-price" : ""}`}>
        <span>
          {isNagative ? "-" : "+"}${Math.abs(changeValue).toFixed(2)}
        </span>
        <span>({changePercent}%)</span>
      </div>
    );
  };

  return (
    <Container>
      <div className="company-detail-container">
        {companyDetail && companyQuote ? (
          <Card className="company-detail-card">
            <Card.Header>
              <div className="company-detail-name">
                {companyDetail["companyName"]}
              </div>
              <CompanyPriceInfo company={companyQuote} />
            </Card.Header>
            <Card.Body>
              <div className="company-detail-body">
                <Row className="company-detail-row">
                  <Col
                    className="company-detail-column"
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <span>1YR Change</span>
                    <span>{getOneYearChange(companyQuote)}</span>
                  </Col>
                  <Col
                    className="company-detail-column"
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <span>CEO</span>
                    <span>{companyDetail["CEO"]}</span>
                  </Col>
                  <Col
                    className="company-detail-column"
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <span>INDUSTRY</span>
                    <span>{companyDetail["industry"]}</span>
                  </Col>
                  <Col
                    className="company-detail-column"
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <span>EMPLOYEES</span>
                    <span>{companyDetail["employees"]}</span>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    </Container>
  );
});

export default CompanyPage;
