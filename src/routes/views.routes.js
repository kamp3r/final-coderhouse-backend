const ejsRouter = require("express").Router();
const redirectAuthentication = require('../app/middlewares/redirectAuth')
const {
  redirectLogin,
  viewHome,
  viewProduct,
  viewRegister,
  viewLogin,
  viewProfile,
  viewEditProfile,
  viewLogout,
  viewAbout,
  viewContact,
  viewProductDetail,
  viewCheckout,
  viewAdmin,
  viewAdminProduct,
  viewAdminUpdateProduct,
} = require("../app/controllers/views");

ejsRouter.get("/", redirectAuthentication, redirectLogin);

ejsRouter.get("/home",redirectAuthentication, viewHome);

ejsRouter.get("/products",redirectAuthentication, viewProduct);

ejsRouter.get("/register", viewRegister);

ejsRouter.get("/login", viewLogin);

ejsRouter.get("/profile",redirectAuthentication, viewProfile);

ejsRouter.get("/editProfile",redirectAuthentication, viewEditProfile);

ejsRouter.get("/logout",redirectAuthentication, viewLogout);

ejsRouter.get("/about",redirectAuthentication, viewAbout);

ejsRouter.get("/contact",redirectAuthentication, viewContact);

ejsRouter.get("/detail/:id",redirectAuthentication, viewProductDetail);

ejsRouter.get("/myCart/checkout",redirectAuthentication, viewCheckout);

ejsRouter.get("/admin",redirectAuthentication, viewAdmin);

ejsRouter.get("/admin/addProduct",redirectAuthentication, viewAdminProduct);

ejsRouter.get("/editProduct/:id",redirectAuthentication, viewAdminUpdateProduct);

module.exports = ejsRouter;