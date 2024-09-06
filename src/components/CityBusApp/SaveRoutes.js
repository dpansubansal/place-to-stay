import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material";

const SaveRoutes = () => {
  const [locations, setLocations] = useState([]);
  const [routeName, setRouteName] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await axios.get("http://localhost:5000/bus/locations");
      setLocations(response.data);
    };
    fetchLocations();
  }, []);

  const [selectedTasks, setSelectedTasks] = useState([]); // Initially empty tasks array

  // Handle task selection change
  const handleTaskChange = (event, index) => {
    const newTasks = [...selectedTasks];
    newTasks[index] = event.target.value;
    setSelectedTasks(newTasks);
  };

  // Filter tasks that are already selected
  const getAvailableTasks = (index) => {
    return locations.filter(
      (task) =>
        !selectedTasks.some(
          (selectedTask, i) =>
            selectedTask && i !== index && selectedTask === task._id
        )
    );
  };

  // Handle task reordering (drag-and-drop)
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(selectedTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSelectedTasks(items);
  };

  // Add new task
  const addTask = () => {
    setSelectedTasks([...selectedTasks, ""]);
  };

  // Remove a task
  const removeTask = (index) => {
    const newTasks = [...selectedTasks];
    newTasks.splice(index, 1); // Remove task at index
    setSelectedTasks(newTasks);
  };

  // Handle form reset
  const handleReset = () => {
    setRouteName(""); // Reset route name
    setSelectedTasks([]); // Reset selected tasks
  };

  // Handle form save (submit)
  const handleSave = async () => {
    const routeData = {
      name: routeName,
      waypoints: selectedTasks,
    };

    console.log("rd", routeData);

    // Send routeData to your backend (example)
    try {
      await axios.post("http://localhost:5000/bus/add-route", routeData);
      alert("Route saved successfully!");
      handleReset(); // Reset the form after successful save
    } catch (error) {
      console.error("Error saving route:", error);
      alert("Failed to save the route.");
    }
  };

  return (
    <>
      <TextField
        label="Route Name"
        variant="outlined"
        fullWidth
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        required
        margin="normal"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {selectedTasks.map((selectedTask, index) => (
                <Draggable
                  key={index}
                  draggableId={`task-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "8px 0",
                        padding: "8px",
                        backgroundColor: "#f4f4f4",
                        border: "1px solid #ddd",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div
                        {...provided.dragHandleProps}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingRight: "10px",
                          cursor: "grab",
                        }}
                      >
                        <DragIcon />
                      </div>
                      <FormControl fullWidth>
                        <InputLabel>Task {index + 1}</InputLabel>
                        <Select
                          value={selectedTask}
                          onChange={(event) => handleTaskChange(event, index)}
                          label={`Task ${index + 1}`}
                        >
                          {getAvailableTasks(index).map((task) => (
                            <MenuItem key={task._id} value={task._id}>
                              {task.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <IconButton
                        aria-label="delete"
                        onClick={() => removeTask(index)}
                        style={{ marginLeft: "8px" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Task Button */}
      <div style={{ marginTop: "16px" }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={addTask}
          style={{ marginRight: "8px" }}
        >
          Add Waypoints
        </Button>
      </div>

      {/* Buttons for saving and resetting */}
      <div style={{ marginTop: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: "8px" }}
        >
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
};

export default SaveRoutes;
