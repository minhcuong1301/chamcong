import { useState, useEffect } from "react";
import { SpinCustom } from "components";


import {
  Layout,
  Row,

} from "antd";
import Camera from "./camera";
const HomePage = () => {
  const [spinning, setSpinning] = useState(false);
  useEffect(() => {
  }, []);

 
  return (
    <Layout className="common-layout">
      <SpinCustom spinning={spinning}>
        <div className="common-layout--header">
          <Row className="filler" gutter={[8, 8]}>
          </Row>
        </div>

        <div className="common-layout--content">
        <Camera />
        </div>
      </SpinCustom>
    </Layout>
  );
};

export default HomePage;
