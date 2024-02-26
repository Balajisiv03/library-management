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

  // Validate inputs (you can add more validation as needed)
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const checkemail = "SELECT * FROM user WHERE email=?";
  db.query(checkemail, [email], (err, data) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (data.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already registered" });
    }

    const sqlinsert =
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    db.query(sqlinsert, [name, email, password], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      console.log(result);
      res.status(200).send("Data inserted successfully");
    });
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

// get all reviews
app.get("/getreviews", (req, res) => {
  const sqlSelectReviews = "SELECT * FROM reviewtable";

  db.query(sqlSelectReviews, (err, result) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

//post a review
app.post("/postreview", (req, res) => {
  const { title, author, review, rating } = req.body;

  const sqlInsertReview =
    "INSERT INTO reviewtable (title, author, review,rating) VALUES (?, ?,?, ?)";
  db.query(sqlInsertReview, [title, author, review, rating], (err, result) => {
    if (err) {
      console.error("Error posting review:", err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({
        message: "Review posted successfully",
        reviewId: result.insertId,
      });
    }
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
