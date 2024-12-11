import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  useTheme,
  Grid,
} from "@mui/material";
import { useTable, useRowSelect, Row, Column } from "react-table";
import { ColorModeContext, tokens } from "./theme";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import UnauthorizedError from "./unauthorizedWarning";
import Sidebar from "./Sidebar";

type Task = {
  taskName: string;
  isDone: boolean;
  dueDate: string;
  taskDescription: string;
};


const CourseTaskTable = () => {
  const { courseId } = useParams();

  // State
  const [courseData, setCourseData] = useState([]);
  const [error, setError] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchCourseTasks = async () => {
    try {
      const response = await fetch(
        `https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        setError(true);
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchCourseTasks();
  }, [courseId]);

  const saveData = async (updatedRow: any) => {
    try {
      const response = await fetch(
        `https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRow),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save task");
      }
      await fetchCourseTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleAddRow = async () => {
    const newRow = {
      taskName: "New task",
      isDone: false,
      dueDate: "2024-12-31",
      taskDescription: "Task description",
    };

    try {
      const response = await fetch(
        `https://studyplanner-production.up.railway.app/courses/${courseId}/tasks`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      await fetchCourseTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Table columns
  
  const columns: Column<Task>[] = useMemo(
    () => [
      {
        Header: "Task Name",
        accessor: "taskName", 
        Cell: ({ value, row }: { value: string; row: Row<Task> }) => (
          <TextField
            value={value}
            onChange={(e) => {
              const updatedRow = { ...row.original, taskName: e.target.value };
              saveData(updatedRow);
            }}
            size="small"
            fullWidth
          />
        ),
      },
      {
        Header: "Finished",
        accessor: "isDone",
        Cell: ({ value, row }: { value: boolean; row: Row<Task> }) => (
          <Checkbox
            checked={value}
            onChange={(e) => {
              const updatedRow = { ...row.original, isDone: e.target.checked };
              saveData(updatedRow);
            }}
          />
        ),
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ value, row }: { value: string; row: Row<Task> }) => (
          <DatePicker
            selected={new Date(value)}
            onChange={(date) => {
              const updatedRow = {
                ...row.original,
                dueDate: date ? date.toISOString().split("T")[0] : value,
              };
              saveData(updatedRow);
            }}
            dateFormat="yyyy-MM-dd"
          />
        ),
      },
      {
        Header: "Description",
        accessor: "taskDescription",
        Cell: ({ value, row }: { value: string; row: Row<Task> }) => (
          <TextField
            value={value}
            onChange={(e) => {
              const updatedRow = {
                ...row.original,
                taskDescription: e.target.value,
              };
              saveData(updatedRow);
            }}
            size="small"
            fullWidth
          />
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: courseData }, useRowSelect);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  if (error) return <UnauthorizedError />;

  return (
    <>
      <Sidebar />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Box width="80%">
          <Typography variant="h4" textAlign="center" marginBottom={2}>
            Tasks for Course {courseId}
          </Typography>

          <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{ borderBottom: "2px solid #ddd", padding: "8px", textAlign: "left" }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRow}
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Add New Task
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CourseTaskTable;
