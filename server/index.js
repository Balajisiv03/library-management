import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  database: "librarym",
  user: "root",
  password: "mysql@2023",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.error("Error in db connection");
  }
  console.log("database connection success");
});

app.post("/insertdata", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const subject = req.body.subject;
  const pdate = req.body.pdate;

  const sqlinsert =
    "insert into booktable(title,author,subject,pdate) values(?,?,?,?)";
  db.query(sqlinsert, [title, author, subject, pdate], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
      console.log("query error");
    }
    console.log(result);
    res.status(200).send("Data inserted successfully");
  });
});

app.get("/getdata", (req, res) => {
  const sqlselect = "select * from booktable";
  db.query(sqlselect, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send(result);
  });
});

app.get(`/getdata/:title`, (req, res) => {
  const title = req.params.title;
  const titleselect = "select * from booktable where author=?";
  db.query(titleselect, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.send(result);
  });
});

app.delete("/deletedetail/:title", (req, res) => {
  const title = req.params.title;
  const sqldelete = "DELETE FROM booktable WHERE title=?";
  db.query(sqldelete, title, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log(result);
      res.status(200).send("Successfully deleted");
    }
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
