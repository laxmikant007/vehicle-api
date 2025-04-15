import authService from "../services/authService.js";
import userService from "../services/userService.js";

async function authenticateUser(req, res, next) {
  let auth_token = req.headers.authorization;

  if (!auth_token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let token = auth_token.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let authObj = await authService.verifyAccessToken({
    token: token,
  });

  if (!authObj) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let user_id = authObj?.user_id;

  let user = await userService.findUserByIdWithMeta(user_id);

  if (!user) {
    return res.status(401).json({
      status_code: 401,
      message: "Unauthenticated",
    });
  }

  req.user = user;
  req.tid = authObj?.tid;

  next();
}

async function authenticateAdmin(req, res, next) {
  let auth_token = req.headers.authorization;
  if (!auth_token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let token = auth_token.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let authObj = await authService.verifyAccessToken({
    token: token,
  });

  if (!authObj) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let user_id = authObj?.user_id;

  let user = await userService.findAdminById(user_id);

  if (!user) {
    return res.status(401).json({
      status_code: 401,
      message: "Unauthenticated",
    });
  }

  req.user = user;
  req.is_admin = true ;
  req.tid = authObj?.tid;

  next();
}

async function authenticateSupport(req, res, next) {
  let auth_token = req.headers.authorization;
  if (!auth_token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let token = auth_token.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let authObj = await authService.verifyAccessToken({
    token: token,
  });

  if (!authObj) {
    return res.status(401).json({
      status: 401,
      message: "Unauthenticated",
    });
  }

  let user_id = authObj?.user_id;

  if(user_id == 1){
    //if user_id is 1, then it is admin grant access
    let admin = await userService.findAdminById(user_id);

    if(!admin){
      return res.status(401).json({
        status_code: 401,
        message: "Unauthenticated",
      });
    }

    req.user = admin;
    req.is_admin = true ;
    req.tid = authObj?.tid;
  
    next();

    return;
  }

  let user = await userService.findSupportById(user_id);
  
  if (!user) {
    
    return res.status(401).json({
      status_code: 401,
      message: "Unauthenticated",
    });
  }

  req.user = user;
  req.is_support = true ;
  req.tid = authObj?.tid;

  next();
}

export default {
  authenticateUser,
  authenticateAdmin,
  authenticateSupport,
};
