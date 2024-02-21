import EventData from "../../../custom_hooks/eventData";
import Common from "../common/common";
import EventContext from "../../../context/eventContext";
import { useContext, useEffect } from "react";
import { anniversaryAnimation } from "./anniversaryAnimation";

function Anniversary() {
  EventData('anniversary');
  const { anniversaryData } = useContext<any>(EventContext);
  const newAnniversaryData = anniversaryData;
  let cleanConfetti: () => void | undefined; //clear animation

  const newData = {
    today:
      (newAnniversaryData.today &&
        newAnniversaryData.today.map((item: any) => {
          item.date = item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],

    passed:
      (newAnniversaryData.passed &&
        newAnniversaryData.passed.map((item: any) => {
          item.date = item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],

    upcoming:
      (newAnniversaryData.upcoming &&
        newAnniversaryData.upcoming.map((item: any) => {
          item.date = item.dateOfJoining ??item.dateOfJoining;
          delete item["dateOfJoining"];
          return item;
        })) ||
      [],
  };

  useEffect(() => {
    cleanConfetti = anniversaryAnimation();
  return () => {
    cleanConfetti?.();
  };
}, []);

  return (
    <>
        <Common data={newData} event={"Work Anniversary"} animation={<> </>}/>
    </>
  );
}

export default Anniversary;
