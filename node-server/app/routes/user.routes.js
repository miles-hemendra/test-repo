const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/all-si', [authJwt.verifyToken], controller.allSI);
  app.get('/api/all-subadmin', [authJwt.verifyToken], controller.allSubadmin);
  app.post('/api/edit-user', [authJwt.verifyToken, authJwt.isAdminOrSubAdminOrSI], controller.editUser);

  app.post('/api/update-profile', [authJwt.verifyToken, verifySignUp.checkDuplicateEmail], controller.updateProfile);
  app.post('/api/send-otp-for-contact-update', [authJwt.verifyToken, verifySignUp.checkDuplicateContact], controller.sendOTPForContactUpdate);
  app.post('/api/update-contact', [authJwt.verifyToken, verifySignUp.checkDuplicateContact], controller.updateContact);
  app.post('/api/check-curr-password', [authJwt.verifyToken], controller.checkCurrPassword);
  app.post('/api/update-password', [authJwt.verifyToken], controller.updatePassword);

  app.post('/api/check-email-exists', [authJwt.verifyToken], controller.checkEmailExists);
  app.post('/api/check-contact-exists', [authJwt.verifyToken], controller.checkContactExists);

  app.get('/api/admin/dashboard-data', [authJwt.verifyToken, authJwt.isAdmin], controller.adminDashboard);
  app.post('/api/admin/add-si', [authJwt.verifyToken, authJwt.isAdminOrSubAdmin, verifySignUp.checkDuplicateContactOrEmail], controller.addSI);
  app.post('/api/admin/add-subadmin', [authJwt.verifyToken, authJwt.isAdmin, verifySignUp.checkDuplicateContactOrEmail], controller.addSubadmin);

  app.get('/api/si/dashboard-data', [authJwt.verifyToken, authJwt.isSI], controller.SIDashboard);
  app.get('/api/si/all-customers', [authJwt.verifyToken, authJwt.isSI], controller.allSiCustomers);
  app.get('/api/si/new-cases', [authJwt.verifyToken, authJwt.isSI], controller.siNewCases);
  app.get('/api/si/open-cases', [authJwt.verifyToken, authJwt.isSI], controller.siOpenCases);
  app.get('/api/si/closed-cases', [authJwt.verifyToken, authJwt.isSI], controller.siClosedCases);
  app.post('/api/si/set-case-open', [authJwt.verifyToken, authJwt.isSI], controller.setCaseOpen);
  app.post('/api/si/set-case-close', [authJwt.verifyToken, authJwt.isSI], controller.setCaseClose);

  app.post('/api/user/set-si', [authJwt.verifyToken], controller.setUserSI);
  app.post('/api/user/set-pi', [authJwt.verifyToken, verifySignUp.checkDuplicateEmail], controller.setUserPI);
  app.post('/api/user/set-camera', [authJwt.verifyToken], controller.setUserCamera);
  app.post('/api/user/set-plan', [authJwt.verifyToken], controller.setUserPlan);
  app.get('/api/user/dashboard-data', [authJwt.verifyToken], controller.userDashboard);
  app.get('/api/user/new-cases', [authJwt.verifyToken], controller.userNewCases);
  app.get('/api/user/open-cases', [authJwt.verifyToken], controller.userOpenCases);
  app.get('/api/user/closed-cases', [authJwt.verifyToken], controller.userClosedCases);

  app.post('/api/get-image-path', [], controller.getImagePath);

  // app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
