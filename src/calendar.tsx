import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './calendar.css'
import Sidebar from './Sidebar'
import { useTheme } from '@mui/material'
import { ColorModeContext, tokens } from './theme'


const locales = {
    'en-US': enUS,
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  

  interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
  }
  
  
  export default function MyCalendar() {
    const [tasks, setTasks] = useState<CalendarEvent[]>([]);
    const navigate = useNavigate();
      const colorMode = useContext(ColorModeContext);
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
    
    useEffect(() => {
        async function fetchTasks() {
          try {
            const response = await fetch("https://studyplanner-production.up.railway.app/calendar",{
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log('All tasks for the user:', tasks);

                const calendarEvents = data.map((task: { taskName: any; dueDate: string | number | Date }) => ({
                    title: task.taskName,                    
                    start: new Date(task.dueDate),       
                    end: new Date(task.dueDate),         
                    allDay: true                        
                  }));
                  setTasks(calendarEvents);
            }
          } catch (error) {
            console.error("Error fetching tasks:", error);
          }
        }
    
        fetchTasks();
      }, []);
      
    return (
        <div style={{ height: "80vh", padding: "20px", display: 'flex'}}>
          <Sidebar/>
          <div className='calendar'>
          <Calendar 
            localizer={localizer}
            events={tasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", margin: "20px", }}
            components={{
                event: ({ event }) => (
                    <div
                    style={{
                        display: 'flex',  
                        flexDirection: 'column',  
                        //backgroundColor: 'lightblue',
                        borderRadius: '5px',
                        padding: '10px',
                        flexGrow: 1,  
                        msOverflowY: 'auto'
                    }}
                  >
                    {event.title}
                  </div>
                ),
            }}
            views={["month"]} 
            defaultView="month"           
          />
          </div>
        </div>
      );
  }