import SampleAreaChart from "../SampleCharts";
import { Row, Col } from "antd";

const DeviceStats = () => {
  return (
    <div className="w-full">
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <div className="w-full">
            <div className="shadow-sm rounded-lg bg-white px-2 py-3 flex items-center justify-center border-solid border-[1px] border-[#bdbdbd]">
              <SampleAreaChart />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="w-full">
            <div className="shadow-sm rounded-lg bg-white px-2 py-3  flex items-center justify-center border-solid border-[1px] border-[#bdbdbd]">
              <SampleAreaChart />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="w-full">
            <div className="shadow-sm rounded-lg bg-white px-2 py-3  flex items-center justify-center border-solid border-[1px] border-[#bdbdbd]">
              <SampleAreaChart />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeviceStats;
