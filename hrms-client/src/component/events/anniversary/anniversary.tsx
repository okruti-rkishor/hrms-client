import EventData from "../../../custom_hooks/eventData";
import Common from "../common/common";
import EventContext from "../../../context/eventContext";
import { useContext, useEffect } from "react";

function Anniversary() {
  EventData('anniversary');
  const { anniversaryData } = useContext<any>(EventContext);
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
