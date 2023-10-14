import dayjs from "dayjs";

export default function formatDate(isoDate) {
  return dayjs(isoDate).format("MMMM D");
}

export const todayDate = new Date().toISOString().split("T")[0];
