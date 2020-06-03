import React, { Component } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const state = {
  tasks: {
    "task-1": { id: "task-1", content: "take out the garbage" },
    "task-2": { id: "task-2", content: "finish uncookd" },
    "task-3": { id: "task-3", content: "get money" },
    "task-4": { id: "task-4", content: "live" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

const ColumnContainer = styled.div``;
const ColumnTitle = styled.h3``;
const TaskList = styled.div``;
const TaskContainer = styled.div``;

class Task extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <TaskContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.props.task.content}
          </TaskContainer>
        )}
      </Draggable>
    );
  }
}

class Column extends Component {
  render() {
    return (
      <ColumnContainer>
        <ColumnTitle>{this.props.column.title}</ColumnTitle>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </ColumnContainer>
    );
  }
}

class App extends Component {
  onDragEnd = (result) => console.log(result);

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

export default App;
