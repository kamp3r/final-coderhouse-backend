const ejsRouter = require("express").Router();
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

ejsRouter.get("/", redirectLogin);

ejsRouter.get("/home", viewHome);

ejsRouter.get("/products", viewProduct);

ejsRouter.get("/register", viewRegister);

ejsRouter.get("/login", viewLogin);

ejsRouter.get("/profile", viewProfile);

ejsRouter.get("/editProfile", viewEditProfile);

ejsRouter.get("/logout", viewLogout);

ejsRouter.get("/about", viewAbout);

ejsRouter.get("/contact", viewContact);

ejsRouter.get("/detail/:id", viewProductDetail);

ejsRouter.get("/myCart/checkout", viewCheckout);

ejsRouter.get("/admin", viewAdmin);

ejsRouter.get("/admin/addProduct", viewAdminProduct);

ejsRouter.get("/editProduct/:id", viewAdminUpdateProduct);

module.exports = ejsRouter;