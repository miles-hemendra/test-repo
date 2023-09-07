const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
// const cors = require("cors");
const mailController = require("./app/controllers/mailCheck.controller")

const app = express();
const port = 3080;

// var corsOptions = {
//   origin: "http://localhost:3080"
// };

setInterval(mailController.startup,5000);
// setTimeout(()=>{mailController.startup();}, 1500)

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(express.static(process.cwd()+"/dist"));
app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/dist/index.html")
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Op = db.Sequelize.Op;
const Role = db.role;
const User = db.user;
const Plan = db.plan;
const Camera = db.camera;
const Dvr = db.dvr;
const Case = db.case;


db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/camera.routes')(app);
require('./app/routes/dvr.routes')(app);
require('./app/routes/plan.routes')(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port `+port+`.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "si"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  Role.create({
    id: 4,
    name: "subadmin"
  });

  Camera.create({
    id: 1,
    name: "Sony"
  });
 
  Camera.create({
    id: 2,
    name: "CP Plus"
  });
 
  Camera.create({
    id: 3,
    name: "Samsung"
  });

  Dvr.create({
    id: 1,
    name: "Sony"
  });
 
  Dvr.create({
    id: 2,
    name: "CP Plus"
  });
 
  Dvr.create({
    id: 3,
    name: "Samsung"
  });

  Plan.create({
    id: 1,
    name: "3 months"
  });
 
  Plan.create({
    id: 2,
    name: "6 months"
  });

  Plan.create({
    id: 3,
    name: "9 months"
  });
 
  Plan.create({
    id: 4,
    name: "12 months"
  });

  Case.create({
    id: 1,
    name: "video Loss"
  });
 
  Case.create({
    id: 2,
    name: "Motion Detection"
  });

  User.findOne({
    where: {
      email: 'admin@blackbox.com'
    }
  }).then(user => {
    if (!user) {
      User.create({
        contact: '7587099393',
        password: bcrypt.hashSync('admin@123', 8),
        email: 'admin@blackbox.com',
        fname: 'Admin'
      }).then(user => {
        Role.findOne({
          where: {
            name: 'admin'
          }
        }).then(role => {
          user.setRole(role).then(() => {
            console.log({ message: "Admin registered successfully!" });
          });
        });
      })
    }
  })
}
