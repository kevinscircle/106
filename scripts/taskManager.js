// short cut: d + cmd + click | down arrow
// clg + enter is console log

// gettting user values

function saveTask() {
  console.log("Task manager...");

  const title = $("#txtTitle").val();
  const description = $("#txtDescription").val();
  const color = $("#txtColor").val();
  const date = $("#txtDate").val();
  const status = $("#selStatus").val();
  const budget = $("#numBudget").val();
  console.log("", title, description, color, date, status, budget);

  // creating an object
  let taskSave = new Task(title, description, color, date, status, budget);
  console.log("", taskSave);

  // save to server (post)

  $.ajax({
    type: "POST",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(taskSave),
    contentType: "application/json",
    success: function (response) {
      console.log("", response);
    },
    error: function (error) {
      console.log("", error);
    },
  });
  displayTask(taskSave);

  // $.ajax({
  //     type: "post",
  //     url: "http://fsdiapi.azurewebsites.net/api/tasks/",
  //     data: JSON.stringify(taskSave),
  //     contentType: "application/json",
  //     success: function (response) {
  //       console.log(response)
  //     },
  //     error: function (error) {
  //       console.log(error)
  //     }
  //   });
}

// save to server (get)

function displayTask(task) {
  //   let syntax = "<h3> Im a task </h3>";
  //   let syntax = `<h3> ${task.title} </h3>
  //         <tr>
  //         <td>${task.description}</td>
  //         <td>${task.status}</td>
  //         <td>${task.date}</td>
  //         </tr>`;

  let syntax = `
        <div class = "task" style = "border-color: ${task.color}">
             <div class = "info">
             <h5> ${task.title} </h5>
             <p> ${task.description} </p>
             </div>
        
        <div class = "status"> ${task.status}</div>
        <div class = "date-budget">
        <span> ${task.date}</span>
        <span> ${task.budget}</span>
        </div>
        </div>
        `;

  $("#list").append(syntax);
}

function loadTask() {
  console.log("from loadTask");
  $.ajax({
    type: "Get",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    // data: JSON.stringify(taskSave),
    // contentType: "application/json",
    success: function (response) {
      console.log("", response);

      let data = JSON.parse(response);
      console.log("response JSON", data);

      // travel the array and get element from array

      for (let i = 0; i < data.length; i++) {
        let task = data[i];

        if (task.name === 'Kevin'){
          displayTask(task);
        }
        
      }
    },
    error: function (error) {
      console.log("", error);
    },
  });
}

function init() {
  $("#btnSave").click(saveTask);

  loadTask();
}

window.onload = init;
