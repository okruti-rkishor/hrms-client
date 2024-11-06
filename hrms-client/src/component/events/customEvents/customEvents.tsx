import React, {useContext, useEffect, useState} from "react";
import {Layout, Modal, Popconfirm, Table, Typography, Input, Select, message, Card} from "antd";
import dayjs from "dayjs";
import "../../../styles/component/customEvent.scss";
import CustomEventAnimation from "./customEventAnimation";
import EventContext from "../../../context/eventContext";
import UserLoginContext from "../../../context/userLoginContext";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons/lib";
import restApi from "../../../services/http/api";
import {PageHeader} from "@ant-design/pro-layout";
import EventData from "../../../custom_hooks/eventData";
import {Event_State} from "../../../constant/constant";


const CustomEvent = () => {

    EventData("custom");
    const {customEventData} = useContext<any>(EventContext);
    const {newUser} = useContext<any>(UserLoginContext);
    const [isEventDetailVisible, setIsEventDetailVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableFields, setEditableFields] = useState<any>({});
    const eventStateEnum = Object.keys(Event_State);
    const eventDetailArr = [
        {
            label: "Title",
            field: "name"
        }, {
            label: "Venue",
            field: "venue"
        }, {
            label: "Host",
            field: "hostBy"
        }, {
            label: "Date",
            field: "date"
        }, {
            label: "Time",
            field: "startTime"
        }, {
            label: "Description",
            field: "description"
        },
    ]


    const userRole = newUser?.roles;
    console.log(userRole);

    const showEventModal = (event: any) => {
        setSelectedEvent(event);
        setEditableFields(event);
        setIsEventDetailVisible(true);
    };

    const handleCancel = () => {
        setIsEventDetailVisible(false);
        setSelectedEvent(null);
        setIsEditing(false);
    };

    const handleDelete = async (item: any) => {
        if (item.id) {
            try {
                await restApi.deleteEvent(item.id);
                message.success("Event deleted successfully!");
                handleCancel();
            } catch (e) {
                console.error("Failed to delete event", e);
            }
        }
    };

    const handleEdit = async () => {
        const {id, ...payload} = editableFields;
        try {
            await restApi.editEvent(payload, id);
            message.success("Event updated successfully!");
            setIsEditing(false);
            handleCancel();
        } catch (e) {
            console.error("Failed to edit event", e);
            message.error("Failed to update event.");
        }
    };

    const handleChange = (key: string, value: any) => {
        setEditableFields((prev: any) => ({...prev, [key]: value}));
    };

    const renderEditableField = (label: string, field: string, isSelect = false) => {

        return (
            <div className="editable-field">
                <strong>{label}:</strong>
                {isEditing && (userRole.includes("ADMIN") || userRole.includes("HR")) ? (
                    isSelect ? (
                        <Select
                            value={editableFields[field]}
                            onChange={(value) => handleChange(field, value)}
                            className={'input-box select'}

                        >
                            {eventStateEnum.map((eventState) => (
                                <Select.Option key={eventState} value={eventState}>
                                    {eventState.toUpperCase()}
                                </Select.Option>
                            ))}
                        </Select>
                    ) : (
                        <Input
                            value={editableFields[field]}
                            onChange={(e) => handleChange(field, e.target.value)}
                            style={{width: "70%", marginLeft: "10px"}}
                            className={'input-box'}
                        />
                    )
                ) : (
                    <span
                        className={(userRole.includes("ADMIN") || userRole.includes("HR")) ? "hover-edit" : ""}
                        onClick={() => (userRole.includes("ADMIN") || userRole.includes("HR")) && setIsEditing(true)}
                        style={{
                            marginLeft: "5px",
                            cursor: (userRole.includes("ADMIN") || userRole.includes("HR")) ? "pointer" : "default"
                        }}
                    >
                        {editableFields[field] || "N/A"}
                    </span>
                )}
            </div>
        );
    };

    const todayEvent = customEventData.today;
    const upcomingEvents = customEventData.upcoming || [];
    const passedEvents = customEventData.passed || [];



    const columns = [
        {
            title: "Event Name",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <a onClick={() => showEventModal(record)} className="clickable-event">
                    {text}
                </a>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date: string) => dayjs(date).format("MMM D, YYYY"),
        },
    ];



    return (
        <Layout className="with-background">
            <div className="data-table birthday-event-section">
                <section className="today-birthday-section">
                    <PageHeader title={`Today's Event`}>
                        {todayEvent && todayEvent.length ? (
                            todayEvent.map((event: { id: string; name: string }) => (
                                <h5 key={event.id} onClick={() => showEventModal(event)} className="clickable">
                                    {event.name}
                                </h5>
                            ))
                        ) : (
                            <p>No events today</p>
                        )}
                    </PageHeader>
                </section>

                <section className="other-birthday-list">
                    <PageHeader title={`Upcoming Events`}>
                        <Table columns={columns} dataSource={upcomingEvents} bordered pagination={{pageSize: 5}}/>
                    </PageHeader>

                    <PageHeader title={`Past Events`}>
                        <Table columns={columns} dataSource={passedEvents} bordered pagination={{pageSize: 5}}/>
                    </PageHeader>
                </section>
            </div>

            <div>
                {isEventDetailVisible && <CustomEventAnimation/>}
                { selectedEvent && (
                    <Modal
                        title="Event Details"
                        visible={isEventDetailVisible}
                        onCancel={handleCancel}
                        footer={
                            (userRole.includes("ADMIN") || userRole.includes("HR")) && (
                                <div>
                                    <Popconfirm
                                        title="Are you sure you want to delete this event?"
                                        onConfirm={() => handleDelete(selectedEvent)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined
                                            className="action-icon"
                                            style={{color: "red", cursor: "pointer"}}
                                        />
                                    </Popconfirm>
                                    <Typography.Link onClick={handleEdit}>
                                        <EditOutlined style={{marginLeft: "10px"}}/>
                                    </Typography.Link>
                                </div>
                            )
                        }
                    >
                        <Card className="event-detail-model">
                            {
                                eventDetailArr.map((event) => {
                                    return renderEditableField(event.label, event.field)
                                }
                            )
                            }
                            {renderEditableField("State","state",true)}
                        </Card>
                    </Modal>
                )}
            </div>
        </Layout>
    );
};

export default CustomEvent;
