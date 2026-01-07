# Workout Project (React + CSS)

This is a workout planner project. It is a front-end application, and data persistence is implemented using the idb package, which allows the application to save workouts and exercises directly in the browser using IndexedDB, ensuring that user data is preserved even after page reloads.

Run the project:
- You can run the project by doing:
1) git clone git@github.com:diogo-dev/Workout-Project.git
2) npm install
3) npm run dev
   
The application have the following pages:
## Home 
- Motivatinal Quote obtained from NinjaAPI

<table align="center">
  <td align="center">
    <img src="/src/assets/home.png" alt="Home Page" width="800" />
  </td>
</table>

## Planner
- The user is able to vizualize the workout for a specific day

<table align="center">
  <td align="center">
    <img src="/src/assets/planner.png" alt="Home Page" width="800" />
  </td>
</table>

>Obs: The user is able to change the workout cards position by 'drag-and-drop'. The animation package used for this functionality was provided by Motion (link: https://motion.dev/)

>Obs: The calendar used on this page was imported from the MUI UI components library (link: https://mui.com/material-ui/all-components/). However, I styled it :)

## Create Workout Page 
- The user can create and delete exercises in their workout
- the user can get workout suggestions from the top-right hand icon on the page  
<table align="center">
  <td align="center">
    <img src="/src/assets/createWorkout.png" alt="Home Page" width="800" />
  </td>
</table>

- This following diagram shows how the user can create a workout:
1) Click in the 'create workout' button in the planner page
2) Fill the form 
3) Hit the 'Add Exercise' button

<table align="center">
  <td align="center">
    <img src="/src/assets/newDiagram.png" alt="Home Page" width="800" />
  </td>
</table>

- The suggestion icon is located at the top-right corner of the Create Workout page. The icon is a hand that displays a message when hovered, as shown below:

<table align="center">
  <tr>
    <td align="left">
      <img src="/src/assets/suggestionIcon.png" alt="icon" width="200" />
    </td>
    <td align="right">
      <img src="/src/assets/suggesitonHover.png" alt="hovered" width="200" />
    </td>
  </tr>
</table>

- The following diagram shows where in the page the icon can be found and the two-step form that pops up when clicking on it:

<table align="center">
  <td align="center">
    <img src="/src/assets/diagram2.png" alt="Home Page" width="800" />
  </td>
</table>

## Session 
- Now it is time to train!
-  The user can use a timer to track workout duration and monitor rest time
-  Also, this page has a simple 'Todo/Done' board so the user can track of exercise progress

<table align="center">
  <td align="center">
    <img src="/src/assets/session.png" alt="Home Page" width="800" />
  </td>
</table>
