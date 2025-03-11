import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
// import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  // const [state, setState] = useState({
  //   options: {
  //     chart: {
  //       type: "line",
  //     },
  //     tooltip: {
  //       theme: "dark",
  //     },
  //     colors: ["#00E396"],
  //     dataLabels: {
  //       enabled: true,
  //     },
  //     stroke: {
  //       curve: "smooth",
  //     },
  //     title: {
  //       text: "Sales Trend",
  //       align: "left",
  //     },
  //     grid: {
  //       borderColor: "#ccc",
  //     },
  //     markers: {
  //       size: 1,
  //     },
  //     xaxis: {
  //       categories: [],
  //       title: {
  //         text: "Date",
  //       },
  //     },
  //     yaxis: {
  //       title: {
  //         text: "Sales",
  //       },
  //       min: 0,
  //     },
  //     legend: {
  //       position: "top",
  //       horizontalAlign: "right",
  //       floating: true,
  //       offsetY: -25,
  //       offsetX: -5,
  //     },
  //   },
  //   series: [{ name: "Sales", data: [] }],
  // });


  // dumy data
  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: [
          "2024-03-01",
          "2024-03-02",
          "2024-03-03",
          "2024-03-04",
          "2024-03-05",
          "2024-03-06",
          "2024-03-07",
        ],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "Sales",
        data: [150, 200, 180, 220, 260, 240, 300],
      },
    ],
  });
  

  // useEffect(() => {
  //   if (salesDetail) {
  //     const formattedSalesDate = salesDetail.map((item) => ({
  //       x: item._id,
  //       y: item.totalSales,
  //     }));

  //     setState((prevState) => ({
  //       ...prevState,
  //       options: {
  //         ...prevState.options,
  //         xaxis: {
  //           categories: formattedSalesDate.map((item) => item.x),
  //         },
  //       },

  //       series: [
  //         { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
  //       ],
  //     }));
  //   }
  // }, [salesDetail]);

  return (
    <>
      {/* <AdminMenu /> */}
      <section className="xl:ml-[4rem] md:ml-[0rem] h-screen overflow-y-auto">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-white flex gap-x-4 items-start justify-between border shadow-md p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-teal-500 text-center p-3">
              ₹
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-semibold">Sales</p>
              <h1 className="text-xl font-bold">
                ₹ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
              </h1>
            </div>
          </div>
          <div className="rounded-lg bg-white flex gap-x-4 items-start justify-between border shadow-md p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-teal-500 text-center p-3">
             👤
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-semibold">Customers</p>
              <h1 className="text-xl font-bold">
                {isLoading ? <Loader /> : customers?.length}
              </h1>
            </div>
          </div>
          <div className="rounded-lg bg-white flex gap-x-4 items-start justify-between border shadow-md p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-teal-500 text-center p-3">
              🤖
            </div>
            <div className="flex flex-col flex-1">
              <p className="font-semibold">All Orders</p>
              <h1 className="text-xl font-bold">
                 {isLoading ? <Loader /> : orders?.totalOrders}
              </h1>
            </div>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
