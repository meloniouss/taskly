import React, { useContext, useState } from 'react';
import { Box, Card, CardContent, TextField, Grid, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from './theme';

type CourseTable = {
  taskName: string;
  isDone: boolean;
  dueDate: Date;
  taskDescription: string;
};

const CourseTaskTable = () => {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [courseData, setCourseData] = useState<CourseTable[]>([
     {
    
        taskName: 'Complete React Project',
        isDone: false,
        dueDate: new Date('2024-11-15'),
        taskDescription: 'Build a simple task manager with React and Material UI.',
      },
      {
        taskName: 'Write Research Paper',
        isDone: true,
        dueDate: new Date('2024-11-10'),
        taskDescription: 'Write a 10-page research paper on Machine Learning.',
      },
      {
        taskName: 'Study for Final Exam',
        isDone: false,
        dueDate: new Date('2024-12-01'),
        taskDescription: 'Review all course material for the final exam.',
      },
      {
        taskName: 'Update Portfolio',
        isDone: false,
        dueDate: new Date('2024-11-20'),
        taskDescription: 'Update personal website with recent projects.',
      },
  ]);


  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnId: keyof CourseTable
  ) => {
    const updatedData = [...courseData]; 
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [columnId]: e.target.value,
    };
    setCourseData(updatedData); 
  };

  return (
    <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"  // Makes sure it takes at least full viewport height
  >
    <Grid 
      container 
      spacing={0} 
      justifyContent="center" 
      alignItems="center"  
      direction="column" 
    >
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
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="filled"
                        fullWidth
                        size="small"
                        value={row.taskName}
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
                    <TextField
                       hiddenLabel
                       id="filled-hidden-label-small"
                       variant="filled"
                       size="small"
                       fullWidth
                      value={new Date(row.dueDate).toLocaleDateString()}
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
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseTaskTable;
