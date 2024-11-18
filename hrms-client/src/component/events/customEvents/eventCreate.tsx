import React, {useContext, useEffect, useState} from "react";
import {Badge, Calendar, DatePicker, Form, Input, Modal} from "antd";
import {Event_State} from "../../../constant/constant";
import dayjs from "dayjs";
import rest from "../../../services/http/api";
import EventContext from "../../../context/eventContext";
import "../../../styles/component/customEvent.scss";
import EventData from "../../../custom_hooks/eventData";

const EventCreate: React.FC = () => {
    EventData('custom');
    const {customEventData} = useContext<any>(EventContext);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);

    const handleOpen = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
        setVisible(true);
    };

    const handleOk = async () => {
        const values = form.getFieldsValue();
        const payload = {
            name: values.name,
            date: dayjs(selectedDate).format("YYYY-MM-DD"),
            startTime: values.eventStartTime ? values.eventStartTime.format("HH:mm:ss") : null,
            venue: values.eventVenue,
            hostBy: values.hostBy,
            state: "CREATED",
            description: values.description,
        };

        try {
            const response = await rest.createEvent(payload);
            const newEvent = {
                ...payload,
                id: response.id,
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            handleClose();
        } catch (e) {
            console.error(e);
        }
    };

    const handleClose = () => {
        form.resetFields();
        setVisible(false);
    };



    const cellHandle = (value: dayjs.Dayjs) => {
        const date = value.format("YYYY-MM-DD");

        return (
            <div className="show-model" onClick={() => handleOpen(value)}>
                <ul className="events">
                    {events.filter(
                        (event: any) => event.date === date
                    ).map((item: any) => (
                        <li key={item.id}>
                            <Badge status="success" text={item.name}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    useEffect(() => {
        const allEvents = [
            ...(customEventData?.today || []),
            ...(customEventData?.upcoming || []),
            ...(customEventData?.passed || []),
        ];
        setEvents(allEvents);
    }, [customEventData]);
    return (
        <div>
            {/* Event Creation Modal */}
            <Modal
                title="Create New Event"
                visible={visible}
                onCancel={handleClose}
                onOk={handleOk}
                className="custom-event-modal"
            >
                <Form form={form} layout="vertical" className="custom-event-form">
                    <Form.Item name="name" label="Event Name" rules={[{required: true}]}>
                        <Input placeholder="Enter event name"/>
                    </Form.Item>
                    <Form.Item name="eventStartTime" label="Event Start Time">
                        <DatePicker showTime format="HH:mm:ss" picker="time"/>
                    </Form.Item>
                    <Form.Item name="eventVenue" label="Event Venue">
                        <Input placeholder="Enter event venue"/>
                    </Form.Item>
                    <Form.Item name="hostBy" label="Host By">
                        <Input placeholder="Enter host name"/>
                    </Form.Item>
                    <Form.Item name="description" label="Event Description">
                        <Input.TextArea rows={4} placeholder="Enter event description"/>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Calendar Section */}
            <div className="event-calendar">
                <Calendar cellRender={cellHandle}
                          onSelect={handleOpen}/>

            </div>
        </div>
    );
};

export default EventCreate;
