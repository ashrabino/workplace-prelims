import React from 'react';

import './App.css';
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';


function App() {

  return (
    
    <ScheduleComponent currentView='Week'>
      <ViewsDirective>
        <ViewDirective option = 'Week' startHour='7:00' endHour='21:00'> </ViewDirective>
        <ViewDirective option = 'Day' startHour='7:00' endHour='21:00'></ViewDirective>
      </ViewsDirective>
      <Inject services={[ Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
    
  );
}

export default App;
