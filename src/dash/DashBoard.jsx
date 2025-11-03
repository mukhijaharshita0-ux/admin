import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import ApexCharts from "apexcharts";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const chartData = [
      {
        id: "chart1",
        name: "New Users",
        color: "#2563EB",
        gradientTo: "#60A5FA",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
      },
      {
        id: "chart2",
        name: "Active Sessions",
        color: "#F59E0B",
        gradientTo: "#FCD34D",
        data: [4500, 4700, 4650, 4800, 4900, 4750],
      },
      {
        id: "chart3",
        name: "Revenue",
        color: "#10B981",
        gradientTo: "#6EE7B7",
        data: [3000, 3400, 3200, 3600, 3700, 3550],
      },
    ];

    const chartInstances = [];

    // ✅ Small Charts
    chartData.forEach((chart) => {
      const options = {
        chart: {
          height: "100%",
          width: "100%",
          type: "area",
          fontFamily: "Inter, sans-serif",
          toolbar: { show: false },
          animations: { enabled: true, easing: "easeinout", speed: 800 },
        },
        stroke: {
          width: 4,
          curve: "smooth",
          colors: [chart.color],
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.5,
            opacityFrom: 0.6,
            opacityTo: 0,
            colorStops: [
              { offset: 0, color: chart.gradientTo, opacity: 0.6 },
              { offset: 100, color: chart.color, opacity: 0 },
            ],
          },
        },
        tooltip: {
          theme: "light",
          style: { fontSize: "13px" },
          y: { formatter: (val) => val.toLocaleString() },
        },
        grid: { show: false },
        dataLabels: { enabled: false },
        series: [{ name: chart.name, data: chart.data }],
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
      };

      const element = document.getElementById(chart.id);
      if (element) {
        element.innerHTML = "";
        const chartInstance = new ApexCharts(element, options);
        chartInstance.render();
        chartInstances.push(chartInstance);
      }
    });

    // ✅ Colorful Leads Chart (bottom)
    const leadsChartOptions = {
      series: [
        {
          name: "Organic",
          color: "#60A5FA",
          data: [
            { x: "Mon", y: 231 },
            { x: "Tue", y: 122 },
            { x: "Wed", y: 63 },
            { x: "Thu", y: 421 },
            { x: "Fri", y: 122 },
            { x: "Sat", y: 323 },
            { x: "Sun", y: 111 },
          ],
        },
        {
          name: "Social Media",
          color: "#F59E0B",
          data: [
            { x: "Mon", y: 232 },
            { x: "Tue", y: 113 },
            { x: "Wed", y: 341 },
            { x: "Thu", y: 224 },
            { x: "Fri", y: 522 },
            { x: "Sat", y: 411 },
            { x: "Sun", y: 243 },
          ],
        },
      ],
      chart: {
        type: "bar",
        height: 400,
        fontFamily: "Inter, sans-serif",
        toolbar: { show: false },
        animations: { enabled: true, easing: "easeinout", speed: 1000 },
        background:
          "linear-gradient(135deg, #1E3A8A 0%, #4338CA 40%, #9333EA 100%)",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 10,
          borderRadiusApplication: "around",
        },
      },
      grid: {
        show: true,
        borderColor: "rgba(255,255,255,0.1)",
        strokeDashArray: 4,
      },
      dataLabels: { enabled: false },
      tooltip: {
        theme: "dark",
        style: { fontFamily: "Inter, sans-serif" },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "13px",
        labels: { colors: "#E5E7EB" },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontSize: "12px",
            colors: Array(7).fill("#E5E7EB"),
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { fontSize: "12px", colors: "#E5E7EB" },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.6,
          gradientToColors: ["#60A5FA", "#FBBF24"],
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.7,
          stops: [0, 100],
        },
      },
    };

    const leadsChartEl = document.getElementById("leadsChart");
    if (leadsChartEl) {
      leadsChartEl.innerHTML = "";
      const chart = new ApexCharts(leadsChartEl, leadsChartOptions);
      chart.render();
      chartInstances.push(chart);
    }

    return () => {
      chartInstances.forEach((instance) => instance.destroy());
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1">
        <Nav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Chart Card 1 */}
          <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-t-4 border-blue-500 transition-all hover:shadow-2xl hover:scale-[1.02]">
            <div id="chart1" className="h-60 w-full"></div>
          </div>

          {/* Chart Card 2 */}
          <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-t-4 border-yellow-500 transition-all hover:shadow-2xl hover:scale-[1.02]">
            <div id="chart2" className="h-60 w-full"></div>
          </div>

          {/* Chart Card 3 */}
          <div className="mt-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-t-4 border-green-500 transition-all hover:shadow-2xl hover:scale-[1.02]">
            <div id="chart3" className="h-60 w-full"></div>
          </div>

          {/* ✅ Colorful Full-width Leads Chart */}
          <div className="col-span-1 md:col-span-2 xl:col-span-3 mt-10 rounded-2xl shadow-2xl p-8 transition-all hover:shadow-2xl hover:scale-[1.01] overflow-hidden">
            <div className="flex flex-wrap justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 text-white">
              <div>
                <h5 className="text-3xl font-bold pb-1">3.4k</h5>
                <p className="text-sm font-medium opacity-80">
                  Leads generated per week
                </p>
              </div>
              <span className="bg-green-500 text-white text-xs font-semibold inline-flex items-center px-3 py-1.5 rounded-full">
                <svg
                  className="w-3 h-3 mr-1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13V1m0 0L1 5m4-4 4 4"
                  />
                </svg>
                +42.5%
              </span>
            </div>

            <div
              id="leadsChart"
              className="h-[400px] w-full rounded-xl p-2 shadow-lg"
            ></div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 text-white">
              <button
                className="text-sm font-medium opacity-90 hover:opacity-100 flex items-center"
                type="button"
              >
                Last 7 days
                <svg
                  className="w-3 h-3 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <a
                href="#"
                className="uppercase text-sm font-semibold inline-flex items-center rounded-lg hover:text-blue-300 px-3 py-2"
              >
                Leads Report
                <svg
                  className="w-3 h-3 ml-2 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
