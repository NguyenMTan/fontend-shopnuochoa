"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
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

export const description = "An interactive bar chart";

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
} satisfies ChartConfig;

export function DashBoardPage() {
    const [optionDay, setOptionDay] = React.useState("last_7_days");
    const { data: chartData } = useGetReports(optionDay);

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

    return (
        <>
            <div className="flex justify-between">
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
                                    stroke="#00f"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <Line
                                    name="Lợi nhuận"
                                    dataKey="net_sales"
                                    type="monotone"
                                    stroke="#0f0"
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
        </>
    );
}
