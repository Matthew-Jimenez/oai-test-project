import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CompanyItem from "../components/CompanyItem";
import { useIex } from "../context/IEXProvider";
import "./companies.scss";

const CompaniesPage = React.memo(() => {
  const client = useIex();
  const [companyList, setCompanyList] = useState([]);

  let interval: { current: NodeJS.Timeout | null } = useRef(null);

  const getCompanyList = () => {
    client.getTopMarketCap().then((res) => {
      if (res && res["status"] === 200 && res["data"]) {
        setCompanyList(JSON.parse(res["data"]));
      }
    });
  };

  useEffect(() => {
    getCompanyList();
    interval.current = setInterval(() => {
      getCompanyList();
    }, 10000);
    return () => clearInterval(interval.current as NodeJS.Timeout);
  }, []);

  return (
    <Container>
      <div className="company-list-container">
        <Row>
          {companyList
            ? companyList.map((company, index) => {
                return (
                  <Col key={index} lg={4} md={4} sm={12}>
                    <CompanyItem company={company} />
                  </Col>
                );
              })
            : null}
          {companyList && !companyList.length ? <p>No Data Found</p> : null}
        </Row>
      </div>
    </Container>
  );
});

export default CompaniesPage;
