const db = require("../models");
const User = db.user;
const Role = db.role;
const Camera = db.camera;
const Dvr = db.dvr;
const Plan = db.plan;
const Case = db.case;
const UserCases = db.userCases;
const Image = db.image;

const request = require('https');

var bcrypt = require("bcryptjs");

const Op = db.Sequelize.Op;

exports.adminDashboard = (req, res) => {
  let data = {};
  Role.findOne({
    where: {
      name: 'subadmin'
    }
  }).then(subadminRole => {
    subadminRole.countUsers().then(subadminCount => {
      data.subadminCount = subadminCount
      Role.findOne({
        where: {
          name: 'si'
        }
      }).then(siRole => {
        siRole.countUsers().then(siCount => {
          console.log('siRole', siCount);
          data.siCount = siCount;
          Role.findOne({
            where: {
              name: 'user'
            }
          }).then(userRole => {
            userRole.countUsers().then(usersCount => {
              data.userCount = usersCount;
              Camera.count().then(cameraCount => {
                data.cameraCount = cameraCount;
                Plan.count().then(planCount => {
                  data.planCount = planCount;
                  Dvr.count().then(dvrCount => {
                    data.dvrCount = dvrCount;
                    UserCases.count({
                      where: {
                        status: 'new'
                      }
                    }).then(newCaseCount => {
                      data.newCaseCount = newCaseCount;
                      UserCases.count({
                        where: {
                          status: 'open'
                        }
                      }).then(openCaseCount => {
                        data.openCaseCount = openCaseCount;
                        UserCases.count({
                          where: {
                            status: 'closed'
                          }
                        }).then(closedCaseCount => {
                          data.closedCaseCount = closedCaseCount;
                          return res.status(200).send(data);
                        });
                      });
                    });
                  });
                });
              });
            })
          });
        })
      });
    })
  })
};

exports.allSubadmin = (req, res) => {
  let data = {};
  Role.findOne({
    where: {
      name: 'subadmin'
    },
    include: [{
      model: User,
      as: 'users'
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(subadminRole => {
    data = subadminRole.users;
    return res.status(200).send(data);
  });
}

exports.addSubadmin = (req, res) => {
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state.value,
    pincode: req.body.pincode,
    password:  bcrypt.hashSync(req.body.contact+'@blackbox', 8)
  }).then(user => {
    Role.findOne({
      where: {
        name: 'subadmin'
      }
    }).then(role => {
      user.setRole(role).then(() => {
        res.status(200).send({status: 'success', subadmin: user})
      })
    })
  })
}

exports.allSI = (req, res) => {
  let data = {};
  Role.findOne({
    where: {
      name: 'si'
    },
    include: [{
      model: User,
      as: 'users'
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  }).then(siRole => {
    data = siRole.users;
    return res.status(200).send(data);
  });
}

exports.addSI = (req, res) => {
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    contact: req.body.contact,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state.value,
    pincode: req.body.pincode,
    password:  bcrypt.hashSync(req.body.contact+'@blackbox', 8)
  }).then(user => {
    Role.findOne({
      where: {
        name: 'si'
      }
    }).then(role => {
      user.setRole(role).then(() => {
        res.status(200).send({status: 'success', si: user})
      })
    })
  })
}

exports.editUser = (req, res) => {
  User.findOne({
    where: {
      contact: req.body.contact
    }
  }).then(user => {
    user.update({
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state.name,
      pincode: req.body.pincode
    }).then(updatedUser => {
      res.status(200).send({status: 'success', user: user})
    })
  })
}

exports.SIDashboard = (req, res) => {
  let data = {};
  User.findByPk(req.userId).then(si => {
    si.countUsers().then(usersCount => {
      data.usersCount = usersCount;
      UserCases.count({
        where: {
          status: 'new',
          siId: si.id
        }
      }).then(newCaseCount => {
        data.newCaseCount = newCaseCount;
        UserCases.count({
          where: {
            status: 'open',
            siId: si.id
          }
        }).then(openCaseCount => {
          data.openCaseCount = openCaseCount;
          UserCases.count({
            where: {
              status: 'closed',
              siId: si.id
            }
          }).then(closedCaseCount => {
            data.closedCaseCount = closedCaseCount;
            return res.status(200).send(data);
          });
        });
      });
    })
  });
}

exports.setUserSI = (req, res) => {
  User.findByPk(req.userId).then(user => {
    User.findOne({
      where: {
        contact: req.body.contact
      }
    }).then(si => {
      user.setUserSI(si).then(() => {
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
      })
    })
  })
}

exports.setUserPI = (req, res) => {  
  User.findByPk(req.userId).then(user => {
    user.update({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state.name,
      pincode: req.body.pincode,
      telegramUsername: req.body.telegramUsername,
      password: bcrypt.hashSync(req.body.password, 8)
    }).then(updatedUser => {
      updatedUser.getRole().then(role => {
        let updatedUserRole = "ROLE_" + role.name.toUpperCase();
        updatedUser.getUserSI().then(userSI => {
          updatedUser.getCameras().then(userCameras => {
            updatedUser.getDvrs().then(userDvrs => {
              updatedUser.getPlan().then(userPlan => {
                res.status(200).send({
                  id: updatedUser.id,
                  contact: updatedUser.contact,
                  email: updatedUser.email,
                  role: updatedUserRole,
                  fname: updatedUser.fname,
                  lname: updatedUser.lname,
                  address: updatedUser.address,
                  city: updatedUser.city,
                  pincode: updatedUser.pincode,
                  state: updatedUser.state,
                  si: userSI,
                  cameras: userCameras,
                  dvrs: userDvrs,
                  plan: userPlan,
                  telegramUsername: updatedUser.telegramUsername
                });
              })
            })
          })
        })
      });
    })
  })
}

exports.setUserCamera = (req, res) => {
  User.findByPk(req.userId).then(user => {
    Camera.findOne({
      where: {
        name: req.body.camera.name
      }
    }).then(camera => {
      user.addCamera(camera, {through: {cameraCount: req.body.cameraCount}}).then(() => {
        Dvr.findOne({
          where: {
            name: req.body.dvr.name
          }
        }).then(dvr => {
          user.addDvr(dvr, {through: {dvrCount: req.body.dvrCount}}).then(() => {
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
          })
        })
      })
    })
  })
}

exports.setUserPlan = (req, res) => {
  User.findByPk(req.userId).then(user => {
    Plan.findOne({
      where: {
        name: req.body.selectedPlan.name
      }
    }).then(plan => {
      user.setPlan(plan).then(() => {
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
      })
    })
  })
}

exports.userDashboard = (req, res) => {
  let data = {};
  User.findByPk(req.userId).then(user => {
    UserCases.count({
      where: {
        status: 'new',
        userId: user.id
      }
    }).then(newCaseCount => {
      data.newCaseCount = newCaseCount;
      UserCases.count({
        where: {
          status: 'open',
          userId: user.id
        }
      }).then(openCaseCount => {
        data.openCaseCount = openCaseCount;
        UserCases.count({
          where: {
            status: 'closed',
            userId: user.id
          }
        }).then(closedCaseCount => {
          data.closedCaseCount = closedCaseCount;
          return res.status(200).send(data);
        });
      });
    });
  });
}

exports.allSiCustomers = (req, res) => {
  User.findByPk(req.userId).then(si => {
    si.getUsers().then(users => {
      return res.status(200).send({users: users});
    })
  })
}

exports.siNewCases = (req, res) => {
  let data = [];
  UserCases.findAll({
    where: {
      siId: req.userId,
      status: 'new'
    }
  }).then(siCases => {
    if(!siCases.length) {
      return res.status(200).send({cases: []});
    } else {
      for (let i = 0; i < siCases.length; i++) {
        User.findByPk(siCases[i].userId).then(user =>{
          Case.findByPk(siCases[i].caseId).then(caseType => {
            siCases[i].getImages().then(images => {
              console.log('image', images);
              let imagePath = images && images.length ? images[0].path+images[0].name : ''
              data.push({
                id: siCases[i].id,
                caseId: siCases[i].caseId,
                createdAt: siCases[i].createdAt,
                earnings: siCases[i].earnings,
                siId: siCases[i].siId,
                status: siCases[i].status,
                updatedAt: siCases[i].updatedAt,
                userId: siCases[i].userId,
                name: caseType.name,
                user: user,
                image: imagePath
              });
              console.log('--->>>>>>>>>>', data);
              if(i == siCases.length-1) {
                return res.status(200).send({cases: data});
              }
            })
          })
        })
      }
    }
  })
}

exports.siOpenCases = (req, res) => {
  let data = [];
  UserCases.findAll({
    where: {
      siId: req.userId,
      status: 'open'
    }
  }).then(siCases => {
    if(!siCases.length) {
      return res.status(200).send({cases: []});
    } else {
      for (let i = 0; i < siCases.length; i++) {
        User.findByPk(siCases[i].userId).then(user => {
          Case.findByPk(siCases[i].caseId).then(caseType => {
            siCases[i].getImages().then(images => {
              console.log('image', images);
              let imagePath = images && images.length ? images[0].path+images[0].name : ''
              data.push({
                id: siCases[i].id,
                caseId: siCases[i].caseId,
                createdAt: siCases[i].createdAt,
                earnings: siCases[i].earnings,
                siId: siCases[i].siId,
                status: siCases[i].status,
                updatedAt: siCases[i].updatedAt,
                userId: siCases[i].userId,
                name: caseType.name,
                user: user,
                image: imagePath
              });
              console.log('--->>>>>>>>>>', data);
              if(i == siCases.length-1) {
                return res.status(200).send({cases: data});
              }
            })
          })
        })
      }
    }
  })
}

exports.siClosedCases = (req, res) => {
  let data = [];
  UserCases.findAll({
    where: {
      siId: req.userId,
      status: 'closed'
    }
  }).then(siCases => {
    if(!siCases.length) {
      return res.status(200).send({cases: []});
    } else {
      for (let i = 0; i < siCases.length; i++) {
        User.findByPk(siCases[i].userId).then(user =>{
          Case.findByPk(siCases[i].caseId).then(caseType => {
            siCases[i].getImages().then(images => {
              console.log('image', images);
              let imagePath = images && images.length ? images[0].path+images[0].name : ''
              data.push({
                id: siCases[i].id,
                caseId: siCases[i].caseId,
                createdAt: siCases[i].createdAt,
                earnings: siCases[i].earnings,
                siId: siCases[i].siId,
                status: siCases[i].status,
                updatedAt: siCases[i].updatedAt,
                userId: siCases[i].userId,
                name: caseType.name,
                user: user,
                image: imagePath
              });
              console.log('--->>>>>>>>>>', data);
              if(i == siCases.length-1) {
                return res.status(200).send({cases: data});
              }
            })
          })
        })
      }
    }
  })
}

exports.setCaseOpen = (req, res) => {
  console.log('caseId', req.body.caseId);
  UserCases.findByPk(req.body.caseId).then(caseFound => {
    caseFound.update({
      status: 'open'
    }).then(() => {
      res.status(200).send({status: 'success'});
    })
  })
}

exports.setCaseClose = (req, res) => {
  UserCases.findByPk(req.body.caseId).then(caseFound => {
    caseFound.update({
      status: 'closed'
    }).then(() => {
      res.status(200).send({status: 'success'});
    })
  })
}

exports.userNewCases = (req, res) => {
  let data = [];
  UserCases.findAll({
    where: {
      userId: req.userId,
      status: 'new'
    }
  }).then(userCases => {
    if(!userCases.length) {
      return res.status(200).send({cases: []});
    } else {
      for (let i = 0; i < userCases.length; i++) {
        User.findByPk(userCases[i].siId).then(si =>{
          Case.findByPk(userCases[i].caseId).then(caseType => {
            userCases[i].getImages().then(images => {
              console.log('image', images);
              let imagePath = images && images.length ? images[0].path+images[0].name : ''
              data.push({
                caseId: userCases[i].caseId,
                createdAt: userCases[i].createdAt,
                earnings: userCases[i].earnings,
                siId: userCases[i].siId,
                status: userCases[i].status,
                updatedAt: userCases[i].updatedAt,
                userId: userCases[i].userId,
                name: caseType.name,
                si: si,
                image: imagePath
              });
              console.log('--->>>>>>>>>>', data);
              if(i == userCases.length-1) {
                return res.status(200).send({cases: data});
              }
            })
          })
        })
      }
    }
  })
}

exports.userOpenCases = (req, res) => {
  let data = [];
  UserCases.findAll({
    where: {
      userId: req.userId,
      status: 'open'
    }
  }).then(userCases => {
    if(!userCases.length) {
      return res.status(200).send({cases: []});
    } else {
      for (let i = 0; i < userCases.length; i++) {
        User.findByPk(userCases[i].siId).then(si =>{
          Case.findByPk(userCases[i].caseId).then(caseType => {
            userCases[i].getImages().then(images => {
              console.log('image', images);
              let imagePath = images && images.length ? images[0].path+images[0].name : ''
              data.push({
                caseId: userCases[i].caseId,
                createdAt: userCases[i].createdAt,
                earnings: userCases[i].earnings,
                siId: userCases[i].siId,
                status: userCases[i].status,
                updatedAt: userCases[i].updatedAt,
                userId: userCases[i].userId,
                name: caseType.name,
                si: si,
                image: imagePath
              });
              console.log('--->>>>>>>>>>', data);
              if(i == userCases.length-1) {
                return res.status(200).send({cases: data});
              }
            })
          })
        })
      }
    }
  })
}

exports.userClosedCases = (req, res) => {
  let data = [];
  UserCases.findAll({
    where: {
      userId: req.userId,
      status: 'closed'
    }
  }).then(userCases => {
    if(!userCases.length) {
      return res.status(200).send({cases: []});
    } else {
      for (let i = 0; i < userCases.length; i++) {
        User.findByPk(userCases[i].siId).then(si =>{
          Case.findByPk(userCases[i].caseId).then(caseType => {
            userCases[i].getImages().then(images => {
              console.log('image', images);
              let imagePath = images && images.length ? images[0].path+images[0].name : ''
              data.push({
                caseId: userCases[i].caseId,
                createdAt: userCases[i].createdAt,
                earnings: userCases[i].earnings,
                siId: userCases[i].siId,
                status: userCases[i].status,
                updatedAt: userCases[i].updatedAt,
                userId: userCases[i].userId,
                name: caseType.name,
                si: si,
                image: imagePath,
              });
              console.log('--->>>>>>>>>>', data);
              if(i == userCases.length-1) {
                return res.status(200).send({cases: data});
              }
            })
          })
        })
      }
    }
  })
}

exports.updateProfile = (req, res) => {
  User.findByPk(req.userId).then(user => {
    user.update({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state.name,
      pincode: req.body.pincode
    }).then(updatedUser => {
      updatedUser.getRole().then(role => {
        let updatedUserRole = "ROLE_" + role.name.toUpperCase();
        updatedUser.getUserSI().then(userSI => {
          updatedUser.getCameras().then(userCameras => {
            updatedUser.getDvrs().then(userDvrs => {
              updatedUser.getPlan().then(userPlan => {
                res.status(200).send({
                  id: updatedUser.id,
                  contact: updatedUser.contact,
                  email: updatedUser.email,
                  role: updatedUserRole,
                  fname: updatedUser.fname,
                  lname: updatedUser.lname,
                  address: updatedUser.address,
                  city: updatedUser.city,
                  pincode: updatedUser.pincode,
                  state: updatedUser.state,
                  si: userSI,
                  cameras: userCameras,
                  dvrs: userDvrs,
                  plan: userPlan,
                  telegramUsername: updatedUser.telegramUsername
                });
              })
            })
          })
        })
      });
    })
  })
}

exports.sendOTPForContactUpdate = (req, res) => {
  let min = Math.ceil(1000);
  let max = Math.floor(9999);
  let otp = Math.floor(Math.random() * (max - min + 1)) + min;

  User.findByPk(req.userId).then(user => {
    console.log('newContact -->> ', req.body.contact);
    user.update({
      otp: otp,
      temp_contact: req.body.contact
    }).then(updatedUser => {
      request.get('https://m1.sarv.com/api/v2.0/sms_campaign.php?token=118140663560028a002ca796.45988311&user_id=37641696&route=OT&template_id=5243&sender_id=BBCCTV&language=EN&template=Dear+User%2C+Your+OTP+for+login+to+BlackboxElectronics+is+'+otp+'.+%0D%0AValid+for+30+min.+Please+do+not+share+this+OTP.%0D%0A%0D%0ARegards%2C+Blackbox+Electronics&contact_numbers='+updatedUser.temp_contact);
      res.status(200).send({status: 'success'});
    })
  })
}

exports.updateContact = (req, res) => {
  User.findByPk(req.userId).then(user => {
    if(user.otp == req.body.otp && user.temp_contact == req.body.contact) {
      user.update({
        contact: req.body.contact
      }).then(updatedUser => {
        updatedUser.getRole().then(role => {
          let updatedUserRole = "ROLE_" + role.name.toUpperCase();
          updatedUser.getUserSI().then(userSI => {
            updatedUser.getCameras().then(userCameras => {
              updatedUser.getDvrs().then(userDvrs => {
                updatedUser.getPlan().then(userPlan => {
                  res.status(200).send({
                    id: updatedUser.id,
                    contact: updatedUser.contact,
                    email: updatedUser.email,
                    role: updatedUserRole,
                    fname: updatedUser.fname,
                    lname: updatedUser.lname,
                    address: updatedUser.address,
                    city: updatedUser.city,
                    pincode: updatedUser.pincode,
                    state: updatedUser.state,
                    si: userSI,
                    cameras: userCameras,
                    dvrs: userDvrs,
                    plan: userPlan,
                    telegramUsername: updatedUser.telegramUsername
                  });
                })
              })
            })
          })
        });
      })
    } else {
      res.status(400).send({message: 'Wrong OTP or mobile number changed. Please try again!'});
    }
  })
}

exports.checkCurrPassword = (req, res) => {
  if(req.body.password) {
    User.findByPk(req.userId).then(user => {
      console.log('passsss--->> ', req.body.password);
      console.log('user--->> ', user);
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if(passwordIsValid) {
        res.status(200).send({status: 'match'})
      } else {
        res.status(200).send({status: 'no0_match'})
      }
    })
  } else {
    res.status(200).send({status: 'no_match'})
  }
}

exports.updatePassword = (req, res) => {
  User.findByPk(req.userId).then(user => {
    user.update({
      password: bcrypt.hashSync(req.body.password, 8)
    }).then(updatedUser => {
      res.status(200).send({status: 'success'});
    })
  })
}

exports.checkEmailExists = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      id: {
        [Op.not]: req.userId
      }
    }
  }).then(user => {
    if(user) {
      res.status(200).send({status: 'exists'});
    } else {
      res.status(200).send({status: 'not_exists'});
    }
  })
}

exports.checkContactExists = (req, res) => {
  User.findOne({
    where: {
      contact: req.body.contact,
      id: {
        [Op.not]: req.userId
      }
    }
  }).then(user => {
    if(user) {
      res.status(200).send({status: 'exists'});
    } else {
      res.status(200).send({status: 'not_exists'});
    }
  })
}

exports.getImagePath = (req, res) => {
  Image.findOne({
    where: {
      uniqueId: req.body.id
    }
  }).then(image => {
    res.status(200).send({path: image.path+image.name});
  })
}
