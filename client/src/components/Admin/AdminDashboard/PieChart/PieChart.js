import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllGroups } from "../../../redux/Groups/groupsSlice";

export default function BasicPie() {
  const data = useSelector((state) => state.groups.data);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  console.log(data);

  const pieChartData = data?.groupsData.map((group) => ({
    id: group._id,
    value: group.students.length,
    label: String(group.numberOfGroupName),
  }));

  React.useEffect(() => {
    // Fetch groups when the component mounts
    dispatch(fetchAllGroups());
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      {pieChartData && (
        <PieChart
          series={[
            {
              data: pieChartData,
              innerRadius: 30,
            },
          ]}
          height={150}
          legend={{
            direction: "column",
            position: {
              vertical: "bottom",
              horizontal: "right",
            },
          }}
          sx={{
            "--ChartsLegend-itemMarkSize": "12px",
            "--ChartsLegend-rootOffsetY": "-70px",
          }}
        />
      )}
    </Box>
  );
}
