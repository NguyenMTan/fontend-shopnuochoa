"use client";

import * as React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { formatPrice } from "@/utils/common";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetReports } from "@/hooks/query-reports/useGetReports";
import { TrendingUp } from "lucide-react";
import { useGetReportCustomers } from "@/hooks/query-reports/useGetReportCustomers";
import { useGetReportOrders } from "@/hooks/query-reports/useGetReportOrders";

const chartConfig = {
    gross_sales: {
        label: "Doanh thu",
    },
    net_sales: {
        label: "Lợi nhuận",
    },
    orders_count: {
        label: "Đơn hàng",
    },
    customer_used: {
        label: "Khách hàng đã mua sản phẩm",
    },
    customer_register: {
        label: "Khách hàng chưa mua sản phẩm",
    },
    status: {
        label: "Trạng thái",
    },
    order_count: {
        label: "Số đơn",
    },
} satisfies ChartConfig;

export function DashBoardPage() {
    const [optionDay, setOptionDay] = React.useState("last_7_days");
    const { data: chartData } = useGetReports(optionDay);
    const { data: dataOrder } = useGetReportOrders(optionDay);
    const { data: dataCustomer } = useGetReportCustomers();
    const colors = ["#3498db", "#e74c3c"];

    const chartDataCustomer = Object.entries(dataCustomer || {}).map(
        ([key, value], index) => ({
            label: key,
            value: value,
            fill: colors[index % colors.length],
        })
    );

    const chartDataOrder = dataOrder?.map((item) => {
        let color;
        let status;

        switch (item.status) {
            case "waiting":
                color = "#ddd";
                status = "Chờ xác nhận";
                break;
            case "shipping":
                color = "#fe0";
                status = "Đang giao";
                break;
            case "success":
                color = "#0f0";
                status = "Giao thành công";
                break;
            case "false":
                color = "#e74c3c";
                status = "Giao thất bại";
                break;
            default:
                color = "#d1d5db";
                status = "Chờ xác nhận  ";
        }

        return {
            ...item,
            status: status,
            fill: color,
        };
    });

    const totalOrderStatus = chartDataOrder?.reduce(
        (acc, cur) => acc + cur.order_count,
        0
    );

    const totalGrossSale = chartData?.reduce(
        (acc, cur) => acc + cur.gross_sales,
        0
    );
    const totalNetSale = chartData?.reduce(
        (acc, cur) => acc + cur.net_sales,
        0
    );
    const totalOrdersCount = chartData?.reduce(
        (acc, cur) => acc + cur.orders_count,
        0
    );

    const totalCustomer = chartDataCustomer?.reduce(
        (acc, cur) => acc + cur.value,
        0
    );

    return (
        <>
            <div className=" flex justify-between">
                <h1 className="text-xl font-bold my-4">
                    Thống kê doanh thu bán hàng:
                </h1>
                <Select
                    onValueChange={(value) => {
                        setOptionDay(value);
                    }}
                >
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Chọn bảng thống kê" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="last_7_days">
                                7 ngày trước
                            </SelectItem>
                            <SelectItem value="last_28_days">
                                28 ngày trước
                            </SelectItem>
                            <SelectItem value="last_year">
                                1 năm trước
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-between">
                <Card className="w-[80%]">
                    <CardContent className="px-2 sm:p-6">
                        <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                        >
                            <LineChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString(
                                            "vi-VN",
                                            {
                                                month: "short",
                                                day: "numeric",
                                            }
                                        );
                                    }}
                                />
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            className="w-[200px] to-blue-700"
                                            nameKey="views"
                                            labelFormatter={(value) => {
                                                return new Date(
                                                    value
                                                ).toLocaleDateString("vi-VN", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                });
                                            }}
                                        />
                                    }
                                />
                                <Line
                                    name="Doanh thu"
                                    dataKey="gross_sales"
                                    type="monotone"
                                    stroke="#e74c3c"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    name="Lợi nhuận"
                                    dataKey="net_sales"
                                    type="monotone"
                                    stroke="#3498db"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <div className="w-[18%] flex flex-col justify-between">
                    <div className="bg-white p-4 rounded-lg w-full box-border hover:shadow-xl">
                        <h1 className="font-semibold text-[18px]">Doanh thu</h1>
                        <h1>{formatPrice(totalGrossSale ?? 0)}</h1>
                    </div>
                    <div className="bg-white p-4 rounded-lg w-full box-border hover:shadow-xl">
                        <h1 className="font-semibold text-[18px]">Lợi Nhuận</h1>
                        <h1>{formatPrice(totalNetSale ?? 0)}</h1>
                    </div>
                    <div className="bg-white p-4 rounded-lg w-full box-border hover:shadow-xl">
                        <h1 className="font-semibold text-[18px]">
                            Tổng số đơn hàng
                        </h1>
                        <h1>{totalOrdersCount ?? 0}</h1>
                    </div>
                </div>
            </div>
            <div className="flex gap-6 mt-6">
                <Card className="w-60 h-70  flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Thống kê khách hàng</CardTitle>
                        <CardDescription>
                            Tổng số người dùng Kewtie
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartDataCustomer}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius={50}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                "cx" in viewBox &&
                                                "cy" in viewBox
                                            ) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalCustomer}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
                                                            className="fill-muted-foreground"
                                                        >
                                                            Khách hàng
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="w-60 h-70 flex flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Thống kê hóa đơn</CardTitle>
                        <CardDescription>Tổng số hóa đơn</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartDataOrder}
                                    dataKey="order_count"
                                    nameKey="status"
                                    innerRadius={50}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                "cx" in viewBox &&
                                                "cy" in viewBox
                                            ) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalOrderStatus}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
                                                            className="fill-muted-foreground"
                                                        >
                                                            Đơn hàng
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
