import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Statistic,
  Icon,
  Spin,
  Alert,
  Typography,
} from "antd";
import "antd/dist/antd.css";
import "./App.css";
import Axios, { AxiosResponse } from "axios";
import SizeChart from "./components/Barchart";
import { PackageData } from "../../interfaces";

const { Title } = Typography;
function App() {
  const [data, setData] = useState<PackageData>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    return setSearchTerm(e.currentTarget.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp: AxiosResponse = await Axios.get(
        `http://localhost:5000/search?s=${searchTerm.toLowerCase()}`
      );

      if (resp.data) {
        setData(resp.data);
        setError("");
        return setIsLoading(false);
      } else {
        setError("Package not found");
      }
    } catch (error) {
      setError("The package you searched couldn't be found!!!");
      return setIsLoading(false);
    }
  };

  const onClose = (e: any) => {};
  // const { data } = metadata;

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <div className="App">
      <Row
        type="flex"
        align="middle"
        style={{ padding: "20px", margin: "30px", height: "100vh" }}
      >
        <Col span={12} offset={6}>
          <Title>Cost of Bundles</Title>
          <Title level={4} style={{ fontWeight: 300, paddingBottom: "18px" }}>
            find the cost of adding a npm package to your bundle
          </Title>
          <form onSubmit={handleSubmit}>
            <Input
              size="large"
              placeholder="Type a package name"
              onChange={handleChange}
              value={searchTerm}
              style={{
                padding: "35px 35px 35px 30px",
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: 400,
              }}
            />
          </form>

          {isLoading ? (
            <Spin indicator={antIcon} style={{ margin: "30px" }} />
          ) : (
            <>
              {error ? (
                <Alert
                  message="Error Text"
                  description={error}
                  type="error"
                  closable
                  onClose={onClose}
                />
              ) : (
                <Row style={{ margin: "30px" }}>
                  <Col span={12}>{data && <Stats {...data} />}</Col>
                  <Col span={12}>{data && <SizeChart chartData={data} />}</Col>
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

const Stats: React.FC<PackageData> = ({ meta, sizes }: PackageData) => {
  return (
    <>
      {meta ? (
        <>
          <Title>{meta.name}</Title>
          <p>{meta.description}</p>
          <Row>
            <Col span={8}>
              <Statistic
                title="BUNDLE SIZE"
                value={`${sizes[2].size / 1000}kB`}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="MINIFIED"
                value={`${sizes[2].minified / 1000}kB`}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="GZIPPED"
                value={`${sizes[2].gzipped / 1000}kB`}
              />
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};

export default App;
