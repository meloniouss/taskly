import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, CardContent, TextField, InputProps, Grid, Typography, useTheme, debounce, Button, Checkbox } from '@mui/material';
import { ColorModeContext, tokens } from './theme';
import {useDebounce} from './debounce';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import UnauthorizedError from './unauthorizedWarning';
import Sidebar from './Sidebar';



type CourseTable = {
  taskName: string;
  isDone: boolean;
  dueDate: string;
  taskDescription: string;
};



const CourseTaskTable = () => {
  const { courseId } = useParams();
  const fetchCourseTasks = async () => {
    try {
      const response = await fetch(`https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`, {
        method: 'GET',
        credentials: 'include', 
      });
      
      if (!response.ok) {
        //setError(true);
        throw new Error('Failed to fetch tasks');
      }

      const data: CourseTable[] = await response.json();
      setCourseData(data); // update state with fetched tasks
    } catch (error) {
      //setError(true);
      console.error('Error fetching tasks:', error);
    }
  };
  const handleAddRow = async () => {
    const newRow = { taskName: "New task", isDone : false, dueDate: "2024-12-31", taskDescription: "Task description" };
    try {
        const response = await fetch(`https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRow),  //dont make the mistake of changing this to courseData again, the api endpoint expects 1 task not a whole list of tasks
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setCourseData([...courseData, newRow]);
        await fetchCourseTasks();

    } catch (error) {
        console.error("Error saving data:", error);
    }
  };

  //text editing functions
  const saveData = async (data: any) => {
    try {
        const response = await fetch(`https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`, {
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
        console.log("Saved data:");
        console.log(result);
        await fetchCourseTasks();
        return result;
    } catch (error) {
        console.error("Error saving data:", error);
    }
};

  const debouncedSaveData = useDebounce(saveData, 300);

  const [inputValue, setInputValue] = useState<string | Date>(''); 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    rowIndex: number,
    columnId: keyof typeof courseData[0]
  ) => {
    let newValue: any; // Type for the new value
    if (columnId === "isDone" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }
    else if (columnId === "dueDate") {
      newValue = e.target.value ? new Date(e.target.value) : null; // Convert string to Date or null
    } else {
      newValue = e.target.value;
    }
    
    const updatedData = [...courseData];
    updatedData[rowIndex] = { 
      ...updatedData[rowIndex], 
      [columnId]: newValue 
    };
    setCourseData(updatedData);
    console.log("Change recorded:");
    console.log(courseData);
    debouncedSaveData(updatedData);
  };
  

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
// ALSO TODO, add a + sign (used to add rows) and a title '{course_name} Tasks'

  const [courseData, setCourseData] = useState<CourseTable[]>([]);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    const fetchCourseTasks = async () => {
      try {
        const response = await fetch(`https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`, {
          method: 'GET',
          credentials: 'include', 
        });
        
        if (!response.ok) {
          setError(true);
          throw new Error('Failed to fetch tasks');
        }

        const data: CourseTable[] = await response.json();
        setCourseData(data); // update state with fetched tasks
      } catch (error) {
        setError(true);
        console.error('Error fetching tasks:', error);
      }
    };
    fetchCourseTasks();
  }, [courseId]); // only fetch when courseId changes
  //if(error) return (<UnauthorizedError />)
  return (
    <><Sidebar />
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
<Grid container spacing={0} justifyContent="center" style={{ width: '850.56px', height: '79.79px', alignItems: 'center' }  }>
        <Card style={{ paddingTop: '15px', width: '100%', height: '100%', alignItems: 'center', backgroundColor: colors.primary[500], border: '1px solid rgba(255, 255, 255, 0.12)'}} >
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
                <Typography variant="h6" align="center" paddingLeft={'45px'}>
                    Due Date
                </Typography>
                </Grid>
                
                {/* Task Description Header */}
                <Grid item xs={4}>
                <Typography variant="h6" align='center' paddingLeft={'px'}>
                    Description
                </Typography>
                
                </Grid>
            </Grid>
            </CardContent>
        </Card>
        </Grid>
        {courseData.map((row, rowIndex) => (
          <Grid item xs={1} md={1} lg={1} key={rowIndex}>
            <Card style={{ margin: '0.5px', backgroundColor: colors.primary[500] }}>
              <CardContent>
                <Grid container direction="row" spacing={10} justifyContent={'center'}>
                  {/* Task Name */}
                  <Grid item>
                  <TextField 
                        value={row.taskName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e, rowIndex, 'taskName')}
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="standard"
                        fullWidth
                        size="small"
                        InputProps={{ disableUnderline: true}}
                        sx={{
                          border: 'none', 
                          padding: '9px', 
                          backgroundColor: 'transparent',
                          color: 'transparent',
                          textAlign: 'center', 
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiInputBase-input': {
                            padding: '0', 
                            textAlign: 'center', 
                          },
                          '&:focus': {
                            outline: 'none', 
                          },
                          '& .MuiFilledInput-input': {
                            backgroundColor: 'transparent', 
                            textAlign: 'center', 
                            padding: '0', 
                          },
                          '& .MuiFilledInput-root': {
                            backgroundColor: 'transparent', 
                            borderBottom: 'none',
                          },
                          '& fieldset': {border: 'none'},
                        }}
                    />
                  </Grid>
                  {/* Completed Checkbox */}
                  <Grid item>
                  <Checkbox
                  checked={row.isDone}  
                  onChange={(e) => handleChange(e, rowIndex,'isDone')}
                  color="secondary" 
                  />
                  </Grid>
                  {/* Due Date */}
                  <Grid item>
                  <DatePicker 
                           onChange={(date) => {
                            const updatedData = [...courseData];
                            updatedData[rowIndex] = {
                              ...updatedData[rowIndex],
                              dueDate: date ? date.toISOString().split('T')[0] : "", 
                            };
                            setCourseData(updatedData);
                            debouncedSaveData(updatedData);
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
                      variant="standard"
                      fullWidth
                      size="small"
                      InputProps={{ disableUnderline: true}}
                      sx={{
                        border: 'none', 
                        borderRadius: 0, 
                        padding: '8px', 
                        backgroundColor: 'transparent',
                        color: 'transparent',
                        textAlign: 'center', 
                        
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '& .MuiInputBase-input': {
                          padding: '0', 
                          textAlign: 'center', 
                        },
                        '&:focus': {
                          outline: 'none', 
                        },
                        '& .MuiFilledInput-input': {
                          backgroundColor: 'transparent', 
                          textAlign: 'center', 
                          padding: '0', 
                        },
                        '& .MuiFilledInput-root': {
                          backgroundColor: 'transparent', 
                          borderBottom: '0px'
                        },
                        '& fieldset': {border: 'none'},
                      }}
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
        <Button sx={{backgroundColor: '#4cceac', marginTop: '20px'}} variant="contained" onClick={handleAddRow} fullWidth>
          Add New Row
        </Button>
        </Grid>
      </Grid>
    </Box>
    </>
  );
  
};


export default CourseTaskTable;


