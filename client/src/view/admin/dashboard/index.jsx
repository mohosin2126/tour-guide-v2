import AreaChart from "../../../Components/area-charts";
import { AlternativeAreaChart, ApexChart, SigleLineChart } from "../../../Components/common-charts";
import PieChart from "../../../Components/pie-charts";
import Card from "../../../Components/reuseable/card";

export default function Dashboard() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mt-5">
                <Card title="Total" className="w-full lg:!h-64" >
                    <ApexChart />
                </Card>
                <Card title="Bonus" className="w-full lg:!h-64" >
                    <AlternativeAreaChart />
                </Card>
                <Card title="Revenue" className="w-full lg:!h-64" >
                    <SigleLineChart />
                </Card>
                <Card title="Profit" className="w-full lg:!h-64" >
                    <ApexChart />
                </Card>
            </div>
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
