import React from 'react';

import './App.css';
import  { Schedule, ResourcesDirective, ResourceDirective, DragAndDrop, Resize, Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,  ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';


export default class App extends React.Component <{}, {}> {
  scheduleObj: any;

  constructor() {
    super({});
  }


  private localData :  object[]  = [
    {
      Id:1,
      Subject: '',
      StartTime: new Date(2022, 3, 17, 0, 0),
      EndTime: new Date(2022, 3, 18, 0, 0),
      ResourceID:1,
      IsBlock: true
    },    {
      Id:2,
      Subject: 'SE 2223',
      StartTime: new Date(2022, 3, 11, 7, 0),
      EndTime: new Date(2022, 3, 11, 10, 0),
      ResourceID:1,
      allowAdding: false
    }
  ]

  public resourceDataSource: Object[] = [
    {Name: 'First Subterm', Id: 1, Color: '#ea7a57', IsBlock: true},
    {Name: 'Second Subterm', Id: 2, Color: '#357CD2', IsBlock: true}
  ]

  onActionBegin(args: { requestType: string; data: string | any[]; cancel: boolean; }) {
    if (args.requestType === 'eventCreate' && args.data.length > 0) {
        let eventData = args.data[0];
        let eventField = this.scheduleObj.eventFields;
        let startDate = eventData[eventField.startTime];
        let endDate = eventData[eventField.endTime];
  
        if(!this.scheduleObj.isSlotAvailable(startDate, endDate)) {
          args.cancel = true;
          alert('Conflicting timeslot!')
        }
  }
  }

  public render() {
    return (

      <ScheduleComponent

        ref={(schedule: any) => this.scheduleObj = schedule}
        width='100%'  
        currentView='Week'
        showHeaderBar={false}
        allowDragAndDrop={true}
        allowMultiCellSelection={true}
        allowMultiDrag={true} 
        allowResizing={true}
        eventSettings={{
          dataSource: this.localData,
          fields: {
            id: 'Id',
            subject: { name: 'Subject', title: 'Subject' },
            location: { name: 'Location', title: 'Location' },
            description: { name: 'Description', title: 'Class Description' },
            startTime: { name: 'StartTime', title: 'From' },
            endTime: { name: 'EndTime', title: 'To' },
          }
        }}
        actionBegin={this.onActionBegin.bind(this)}>


          <ViewsDirective>
            <ViewDirective option='Week' startHour='7:00' endHour='21:00' firstDayOfWeek={1}> </ViewDirective>
          </ViewsDirective>
          <ResourcesDirective>
            <ResourceDirective field='ResourceID' title='Subterm' name='Resources' textField='Name' idField='Id' colorField='Color' dataSource={this.resourceDataSource}></ResourceDirective>
          </ResourcesDirective>

          <Inject services={[Day, Week, WorkWeek, Month, Agenda, DragAndDrop, Resize, Schedule]} />
        </ScheduleComponent>
    
    
    
  );
}
}

