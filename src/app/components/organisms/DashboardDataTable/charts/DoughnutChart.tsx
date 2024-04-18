import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";

const DoughnutChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = { plugins: { legend: { position: "bottom" } } };
  const data = {
    labels: ["Green", "Orange"],
    legend: {
      position: "bottom",
    },
    datasets: [
      {
        label: "# of Votes",
        data: [80, 19],
        backgroundColor: ["#00CA54", "#FF7629"],
        borderColor: ["#00CA54", "#FF7629"],
        borderWidth: 1,
        borderRadius: 12,
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "1px solid blue",
      }}
    >
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              position: "bottom",

              labels: {
                boxHeight: 40,
                boxWidth: 40,
                usePointStyle: true,
                pointStyle: "circle",
                borderRadius: 20,
                useBorderRadius: true,
              },
            },
          },
        }}
      />
      <Box sx={{ padding: "12px" }}></Box>
    </Box>
  );
};

export default DoughnutChart;
