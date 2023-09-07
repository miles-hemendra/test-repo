const request = require('https');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [
        {email: req.body.contact},
        {contact: req.body.contact}
      ]
    }
  }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if(req.body.password) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(400).send({
            accessToken: null,
            message: 'Invalid Password!'
          });
        }
      } else if(req.body.otp) {
        if(user.otp !== +req.body.otp) {
          return res.status(400).send({
            accessToken: null,
            message: 'Invalid OTP!'
          })
        }
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      user.getRole().then(role => {
        let userRole = "ROLE_" + role.name.toUpperCase();
        user.getUserSI().then(userSI => {
          user.getCameras().then(userCameras => {
            user.getDvrs().then(userDvrs => {
              user.getPlan().then(userPlan => {
                res.status(200).send({
                  id: user.id,
                  contact: user.contact,
                  email: user.email,
                  role: userRole,
                  accessToken: token,
                  fname: user.fname,
                  lname: user.lname,
                  address: user.address,
                  city: user.city,
                  pincode: user.pincode,
                  state: user.state,
                  si: userSI,
                  cameras: userCameras,
                  dvrs: userDvrs,
                  plan: userPlan,
                  telegramUsername: user.telegramUsername
                });
              })
            })
          })
        })
      });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.sendOTP = (req, res) => {
  let min = Math.ceil(1000);
  let max = Math.floor(9999);
  let otp = Math.floor(Math.random() * (max - min + 1)) + min; 

  User.findOne({
    where: {
      contact: req.body.contact
    }
  }).then(user => {
    if(!user) {
      Role.findOne({
        where: {
          name: 'user'
        }
      }).then(role => {
        User.create({
          contact: req.body.contact,
          otp: otp,
          roleId: role.id
        }).then(user => {
		      // console.log('otp-->>', otp);
		      // console.log('contact-->>', user.contact);
          request.get('https://m1.sarv.com/api/v2.0/sms_campaign.php?token=118140663560028a002ca796.45988311&user_id=37641696&route=OT&template_id=5243&sender_id=BBCCTV&language=EN&template=Dear+User%2C+Your+OTP+for+login+to+BlackboxElectronics+is+'+otp+'.+%0D%0AValid+for+30+min.+Please+do+not+share+this+OTP.%0D%0A%0D%0ARegards%2C+Blackbox+Electronics&contact_numbers='+user.contact);
          ''
          return res.status(200).send({status: 'success'})
        })
      })
    } else {
      user.update({
        otp: otp
      }).then(user => {
	      // console.log('otp-->>', otp);
	      // console.log('contact-->>', user.contact);
        request.get('https://m1.sarv.com/api/v2.0/sms_campaign.php?token=118140663560028a002ca796.45988311&user_id=37641696&route=OT&template_id=5243&sender_id=BBCCTV&language=EN&template=Dear+User%2C+Your+OTP+for+login+to+BlackboxElectronics+is+'+otp+'.+%0D%0AValid+for+30+min.+Please+do+not+share+this+OTP.%0D%0A%0D%0ARegards%2C+Blackbox+Electronics&contact_numbers='+user.contact);
        return res.status(200).send({status: 'success'})
      })
    }
  });
}
