import AreaChart from "../../../Components/area-charts";
import PieChart from "../../../Components/pie-charts";
import Card from "../../../Components/reuseable/card";

export default function Overview() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="cols-span-1 lg:col-span-3">
          <Card title="Daily Visit Tour" >
            <AreaChart />
          </Card>

        </div>
        <div className="cols-span-1 lg:col-span-2">
          <Card title="Department of Tour" >
            <PieChart />
          </Card>
        </div>
      </div>

    </div>
  )
}
