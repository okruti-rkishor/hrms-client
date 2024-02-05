import BirthdayData from "../../../custom_hooks/birthdayData";
import Common from "../common/common";
import BirthdayContext from "../../../context/birthdayContext";
import { useContext, useEffect } from "react";

function Anniversary() {
  BirthdayData('anniversary');
  const { anniversaryData } = useContext<any>(BirthdayContext);
  console.log("anniversary11", anniversaryData);
  const data11 = anniversaryData;

  const newData = {
    today:
      (data11.today &&
        data11.today.map((item: any) => {
          item.date = item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],

    passed:
      (data11.passed &&
        data11.passed.map((item: any) => {
          item.date = item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],

    upcoming:
      (data11.upcoming &&
        data11.upcoming.map((item: any) => {
          
          item.date = item.dateOfJoining ??item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],
  };

  return (
    <>
      <Common data={newData} event={"Anniversary"} />
    </>
  );
}

export default Anniversary;
