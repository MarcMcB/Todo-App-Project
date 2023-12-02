import express from "express";
import bodyParser from "body-parser";



const app = express();
const port = 3000;
const day = new Date().getDate()
    const month = new Date().toLocaleString('default', { month: 'short' });
    const year = new Date().getFullYear()
    const nthNumber = (number) => {
        if (number > 3 && number < 21) return "th";
        switch (number % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };
    const date = `${day}${nthNumber(day)} ${month} ${year}`;

    let workList = [
      {id: 1, task: "find a job", isDone: false},
      {id: 2, task: "start a job", isDone: false},
    ];
    
    let myList = [
      {id: 1, task: "water chillies", isDone: false},
      {id: 2, task: "feed cats", isDone: false},
    ];

app.set('view engine', 'ejs');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});

app.get("/", (req,res) => {
    
    
    res.render("index.ejs", {today:date, My_List: myList, Work_List: workList })
});

app.post("/work", (req,res) => {
  const newWorkToDo = req.body.new_work_task;
  const newId = workList.length + 1
  workList.push({id: newId, task: newWorkToDo, isDone: false })
  res.redirect('/');
});
app.post('/work/delete/:id', (req,res) => {
  const taskId = parseInt(req.params.id);
  workList = workList.filter(task => task.id !== taskId);
  res.redirect('/');
});

app.post('/work/done/:isDone/:id', (req,res) => {
  const taskId = parseInt(req.params.id);
  let doneTask = workList.find(task => task.id === taskId)
  doneTask.isDone = !doneTask.isDone
  
  res.redirect('/');
});





app.post("/my", (req,res) => {
  const MyTodo = req.body.new_my_task;
  const newId = myList.length + 1;
  myList.push({id: newId, task: MyTodo})
  res.redirect('/');
});

app.post('/my/delete/:id', (req,res) => {
  const taskId = parseInt(req.params.id);
  myList = myList.filter(task => task.id !== taskId);
  
  res.redirect('/');
});
app.post('/my/done/:id', (req,res) => {
  const taskId = parseInt(req.params.id);
  let doneTask = myList.find( task => task.id === taskId)
  doneTask.isDone = !doneTask.isDone
  res.redirect('/');
});

