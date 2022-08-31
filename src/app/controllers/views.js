const ProductController = require('./products')

const redirectLogin = (req, res) => {
    if(!req.user) {
      res.redirect("/login");
    }
  };
  
  const viewHome = (req, res) => {
    res.render("home", {
      title: "home",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewProduct = async (req, res) => {
    const products = await ProductController.list();
    res.render("products", {
      products,
      title: "products",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewRegister = (req, res) => {
    if(!req.cookies.token) {
    res.render("register", {
      title: "register",
      user: req.user,
    });
    }else{
      res.redirect("/profile");
    }
  };
  
  const viewLogin = (req, res) => {
    res.render("login", {
      title: "login",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewProfile = (req, res) => {
    res.render("profile", {
      title: "profile",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewEditProfile = (req, res) => {
    res.render("edit", {
      PATCH: true,
      title: "editProfile",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewLogout = (req, res, next) => {
    res.clearCookie("token");
    res.clearCookie("cart");
    res.render("logout", {
      title: "logout",
      user: req.user,
    });
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
  };
  
  const viewAbout = (req, res) => {
    res.render("about", {
      title: "about",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewContact = (req, res) => {
    res.render("contact", {
      title: "contact",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewProductDetail = async (req, res) => {
    const product = await ProductController.listId(req.params.id);
    res.render("productDetail", {
      product,
      title: `${product.name}`,
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewCheckout = (req, res) => {
    if (req.cookies.cart == undefined) {
      req.cookies.cart = [];
    }
    res.render("checkout", {
      title: "checkout",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewAdmin = async (req, res) => {
    const products = await ProductService.getAll();
    res.render("admin", {
      products,
      title: "admin",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewAdminProduct = (req, res) => {
    res.render("addProducts", {
      title: "addProducts",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  const viewAdminUpdateProduct = async (req, res) => {
    const product = await ProductService.getById(req.params.id);
    res.render("updateProd", {
      PATCH: true,
      product,
      title: "updateProd",
      user: req.user,
      cart: req.cookies.cart,
    });
  };
  
  module.exports = {
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
  };