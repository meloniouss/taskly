import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, TextField, Grid, Typography, useTheme, debounce, Button } from '@mui/material';
import { ColorModeContext, tokens } from './theme';
import {useDebounce} from './debounce';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';



type CourseTable = {
  taskName: string;
  isDone: boolean;
  dueDate: string;
  taskDescription: string;
};



const CourseTaskTable = () => {
  const { courseId } = useParams();
  const testRow = {
    taskName: "Test Task",
    isDone: false,
    dueDate: "2024-12-31",
    taskDescription: "This is a test task"
};
  const handleAddRow = async () => {
    const newRow = { taskName: "New task", isDone : false, dueDate: "2024-12-31", taskDescription: "" };
    setCourseData([...courseData, newRow]);
    console.log("Saving data:", newRow);
    try {
        console.log(`${courseId}`) //hardcoded for now
        const response = await fetch(`http://localhost:9000/courses/22/tasks`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('sessionToken')}` 

            },
            body: JSON.stringify(testRow), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Data saved successfully:", result);
        return result;
    } catch (error) {
        console.error("Error saving data:", error);
    }
  };

  //text editing functions
  const saveData = async (data: any) => {
    console.log("Saving data:", data);
    try {
        const response = await fetch("http://localhost:9000/courses/{courseId}/tasks", {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Data saved successfully:", result);
        return result;
    } catch (error) {
        console.error("Error saving data:", error);
    }
};

  const debouncedSaveData = useDebounce(saveData, 500);
  const [inputValue, setInputValue] = useState<string | Date>(''); 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    columnId: keyof typeof courseData[0]
  ) => {
    let newValue: any; // Type for the new value
  
    if (columnId === "dueDate") {
      // Handle the date field
      newValue = e.target.value ? new Date(e.target.value) : null; // Convert string to Date or null
    } else {
      // Handle other text fields
      newValue = e.target.value;
    }
  
    const updatedData = [...courseData];
    updatedData[rowIndex] = { 
      ...updatedData[rowIndex], 
      [columnId]: newValue 
    };
    setCourseData(updatedData);
  
    debouncedSaveData(updatedData);
  };
  

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
 // fetch data on first render
 // to-do: save to db in save function
 // no need to refetch as it's a textfield and remains

// ALSO TODO, add a + sign (used to add rows) and a title '{course_name} Tasks'


  const [courseData, setCourseData] = useState<CourseTable[]>([]); //hardcoded test data
  useEffect(() => {
    const fetchCourseTasks = async () => {
      try {
        const response = await fetch(`http://localhost:9000/courses/${courseId}/tasks`, {
          method: 'GET',
          credentials: 'include', 
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data: CourseTable[] = await response.json();
        setCourseData(data); // Update state with fetched tasks
        console.log('successfully fetched tasks');
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Fetch tasks for the current course
    fetchCourseTasks();
  }, [courseId]); // Only fetch when courseId changes

  return (
    <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"  
  >
    <Grid 
      container 
      spacing={0} 
      justifyContent="center" 
      alignItems="center"  
      direction="column" 
    >
      {/* headers */}
<Grid container spacing={0} justifyContent="center" style={{ width: '826.01px', height: '76.68px', alignItems: 'center' }  }>
        <Card style={{ paddingTop: '15px', width: '100%', height: '100%', alignItems: 'center'}} >
            <CardContent>
            <Grid container xs={12} md={12} lg={12} direction="row" >
                <Grid item xs={3} alignItems={'center'}>
                <Typography align="center"  paddingRight={'25px'}>
                    Task Name
                </Typography>
                </Grid>
                
                <Grid item xs={2}>
                <Typography variant="h6" align="center" paddingLeft={'8px'}>
                    Finished
                </Typography>
                </Grid>

                <Grid item xs={3}>
                <Typography variant="h6" align="center">
                    Due Date
                </Typography>
                </Grid>
                
                {/* Task Description Header */}
                <Grid item xs={4}>
                <Typography variant="h6" align='center' paddingLeft={'60px'}>
                    Description
                </Typography>
                </Grid>
            </Grid>
            </CardContent>
        </Card>
        </Grid>
        {courseData.map((row, rowIndex) => (
          <Grid item xs={1} md={1} lg={1} key={rowIndex}>
            <Card style={{ margin: '0.5px' }}>
              <CardContent>
                <Grid container direction="row" spacing={10} justifyContent={'center'}>
                  {/* Task Name */}
                  <Grid item>
                    <TextField
                        value={row.taskName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, rowIndex, 'taskName')}
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="filled"
                        fullWidth
                        size="small"
                    />
                  </Grid>
                  {/* Completed Checkbox */}
                  <Grid item>
                    <TextField
                      size="small"
                      fullWidth
                      variant='standard'
                      type="checkbox"
                    />
                  </Grid>
                  {/* Due Date */}
                  <Grid item>
                  <DatePicker 
                           onChange={(date) => {
                            const updatedData = [...courseData];
                            updatedData[rowIndex] = {
                              ...updatedData[rowIndex],
                              dueDate: date ? date.toISOString().split('T')[0] : "", // Format to 'YYYY-MM-DD' or empty string if null
                            };
                            setCourseData(updatedData); // Update state directly here
                            debouncedSaveData(updatedData); // Call debounced save function
                          }}
                          
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select a date"
                          value={courseData[rowIndex].dueDate}
                  />
                  </Grid>
                  {/* Task Description */}
                  <Grid item>
                    <TextField
                       hiddenLabel
                       id="filled-hidden-label-small"
                       variant="filled"
                       size="small"
                       fullWidth
                       value={row.taskDescription}
                       onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, rowIndex, 'taskDescription')}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {/* Add New Row Button */}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleAddRow} fullWidth>
          Add New Row
        </Button>
        </Grid>
      </Grid>
    </Box>
  );
  
};


export default CourseTaskTable;


