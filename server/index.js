import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
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

//auth
app.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const checkemail = "select * from user where email=?";
  db.query(checkemail, [email], (err, data) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }
    if (data.length > 0) {
      return res
        .status(400)
        .json({ Error: "User with is email already registered" });
    } else {
      const sqlinsert = "insert into user (name,email,password) values(?,?,?)";
      db.query(sqlinsert, [name, email, password], (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        console.log(result);
        res.status(200).send("Data inserted successfully");
      });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlinsert = "select * from user where email=?";
  db.query(sqlinsert, [email], (err, data) => {
    if (err) {
      console.error("Error in database query:", err);
      return res.json({ Error: "Internal Email Error" });
    }

    if (email.trim() === "" || password.trim() === "") {
      return res.json({
        Status: "Error",
        Error: "Please enter both email and password.",
      });
    }
    if (data.length > 0) {
      try {
        const checkpass = req.body.password;
        const password = data[0].password;
        const compare = checkpass.localeCompare(password);
        console.log(compare);
        if (compare == 0) {
          const token = jwt.sign(
            { email: req.body.email, password: data[0].password },
            "test",
            { expiresIn: "1h" }
          );
          return res.json({ Status: "Success", token });
        } else {
          return res.json({ Error: "Password not matched" });
        }
      } catch (error) {
        return res.json({ Error: `Internal Logging Error ${error}` });
      }
    } else {
      return res.json({ Error: "Email Not Existed" });
      // return res.json({Error:"Password not matched"})
    }
  });
});

//bookdetails
app.post("/insertdata", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const subject = req.body.subject;
  const pdate = req.body.pdate;
  const cost = req.body.cost;
  const quantity = req.body.quantity;

  const sqlinsert =
    "insert into booktable(title,author,subject,pdate,cost,quantity) values(?,?,?,?,?,?)";
  db.query(
    sqlinsert,
    [title, author, subject, pdate, cost, quantity],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
        console.log("query error");
      }
      console.log(result);
      res.status(200).send("Data inserted successfully");
    }
  );
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

app.get("/getdata/:title", (req, res) => {
  const title = req.params.title;
  const titleselect = "select * from booktable where author=?";
  db.query(titleselect, title, (err, result) => {
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

//edit book details
// app.put("/editbook/:bookid", (req, res) => {
//   const bookid = req.params.bookid;
//   const { title, author, subject, pdate, cost, quantity } = req.body;

//   const sqlUpdate =
//     "UPDATE booktable SET title=?, author=?, subject=?, pdate=?, cost=?, quantity=? WHERE bookid=?";
//   db.query(
//     sqlUpdate,
//     [title, author, subject, pdate, cost, quantity, bookId],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//       } else {
//         console.log(result);
//         res.status(200).json({ Status: "Success", result });
//       }
//     }
//   );
// });

//borrow books
app.post("/borrowbook", (req, res) => {
  const title = req.body.title;
  const quantity = req.body.quantity;

  const sqlUpdate =
    "UPDATE booktable SET quantity = quantity - ? WHERE title = ?";
  db.query(sqlUpdate, [quantity, title], (err, result) => {
    if (err) {
      console.error("Error updating book quantity:", err);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(result);
    res.status(200).send("Book borrowed successfully");
  });
});

app.get("/getBorrowedBooks", (req, res) => {
  const sqlSelectBorrowedBooks = "SELECT * FROM booktable WHERE quantity < 5";

  db.query(sqlSelectBorrowedBooks, (err, result) => {
    if (err) {
      console.error("Error fetching borrowed books:", err);
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(result);
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
