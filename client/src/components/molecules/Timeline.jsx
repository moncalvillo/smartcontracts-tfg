import { Timeline } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TimelineDrawer = ({expense}) => {

    const {t} = useTranslation();

    if(!expense.resolvedAt){
        return (
            <div className='timeline-div'>
                <Timeline className="timeline" mode="right" pending={t("Common:pending")}>
                    <Timeline.Item color="green" label={`${new Date(expense.createdAt).toLocaleString()}`}>{t("Common:created")}</Timeline.Item>
                    <Timeline.Item color="red"> {t("Common:notResolvedSC")} </Timeline.Item>
                    <Timeline.Item> {t("Common:sentOracle")} </Timeline.Item>
                </Timeline>
            </div>
        );
    }

    if(!expense.updatedAt){
        if(expense.Inspector.name){
            return(
                <div className='timeline-div'>
                    <Timeline className="timeline" mode="right">
                        <Timeline.Item color="green" label={`${new Date(expense.createdAt).toLocaleString()}`}> {t("Common:created")} </Timeline.Item>
                        <Timeline.Item> {t("Common:sentSC")} </Timeline.Item>
                        <Timeline.Item color="green" label={`${new Date(expense.resolvedAt).toLocaleString()}`}> {t("Common:resolvedSC")} </Timeline.Item>
                    </Timeline>
                </div>
            );
        }else{
            return(
                <div className='timeline-div'>
                    <Timeline className="timeline" mode="right">
                        <Timeline.Item color="green" label={`${new Date(expense.createdAt).toLocaleString()}`}> {t("Common:created")} </Timeline.Item>
                        <Timeline.Item> {t("Common:sentSC")} </Timeline.Item>
                        <Timeline.Item color="red"> {t("Common:notResolvedSC")} </Timeline.Item>
                        <Timeline.Item> {t("Common:sentOracle")} </Timeline.Item>
                        <Timeline.Item color="green" label={`${new Date(expense.resolvedAt).toLocaleString()}`}> {t("Common:resolvedBy")} {`${expense.Inspector.firstName} ${expense.Inspector.lastName}`} </Timeline.Item> 
                    </Timeline>
                </div>
            );
        }
    }

    
    return(
        <div className='timeline-div'>
            <Timeline className="timeline" mode="right">
                <Timeline.Item color="green" label={`${new Date(expense.createdAt).toLocaleString()}`}> {t("Common:created")} </Timeline.Item>
                <Timeline.Item> {t("Common:sentSC")} </Timeline.Item>
                <Timeline.Item color="red"> {t("Common:notResolvedSC")} </Timeline.Item>
                <Timeline.Item> {t("Common:sentOracle")} </Timeline.Item>
                <Timeline.Item color="orange" label={`${new Date(expense.resolvedAt).toLocaleString()}`}> {t("Common:resolved")} </Timeline.Item> 
                <Timeline.Item color="green" label={`${new Date(expense.updatedAt).toLocaleString()}`}> {t("Common:updatedBy")} {`${expense.Inspector.firstName} ${expense.Inspector.lastName}`} </Timeline.Item> 
            </Timeline>
        </div>
    );
    
};

export default TimelineDrawer;