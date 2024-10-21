"use client";

import { AreaChart, Card, Title } from "@tremor/react";

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

export const AreaChartDemo = ({ chartData, title }: any) => (
  <Card>
    <Title>{title}</Title>
    <AreaChart
      className="h-72 mt-4"
      data={chartData}
      index="date"
      categories={["Number"]}
      colors={["orange"]}
      valueFormatter={dataFormatter}
    />
  </Card>
);
