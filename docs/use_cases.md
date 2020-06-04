# Brief description

Project starts when it's created. Then user populates the project with tasks.

Project start time is set when project is created, and can be modified in the settings.

When task is checked it notifies state change on the server side.

Send {_id: "5ed0c941ec7c3fb015476c0f", status: "done"}



# Use cases

## Create new project

Prerequisites: None

Flow of events:

1. User fills name, goal, deadline and optional password for the project
2. System sends create request to the server
3. Server creates new project in the Database

Postconditions: Project created in the Database


## 


