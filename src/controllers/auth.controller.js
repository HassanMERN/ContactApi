const DBInitializer = require("../../db/connection");
const { Op } = require("sequelize");
const UserModel = require("../services/users/users.model");
const RolesModel = require("../services/roles/roles.model");
const PermissionsModel = require("../services/permissions/permissions.model");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/sendResponse");
const { hash, hash_compare } = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const emailSender = require("../utils/emailSender");
const recoveryCodeGenerator = require("../utils/recoveryCodeGenerator");
const recoveryCode = require("../utils/recoveryCodeGenerator");

/**
 * Description of the auth controller.
 * @module auth.controller
 * @type {{signUp:Function}}
 * @type {{login:Function}}
 */
module.exports = {
  /**
   * Description of the signup controller.
   * @function signUp
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async signUp(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const Role = new RolesModel(db.models.Role);
      const Permission = new PermissionsModel(db.models.Permission);
      const { email, password, fullName } = req.body;
      let where = {
        [Op.or]: [{ email }],
      };
      let user = await User.getUser(where);
      if (user && user.length) {
        return sendErrorResponse(
          res,
          422,
          "User with that email already exists"
        );
      }
      let newUser = await User.createUser({
        fullName,
        email,
        passwordHash: hash(password),
      });
      const userRole = await Role.getRole({
        name: constants.ROLE_SUPER_ADMIN,
      });
      const allPermissions = await Permission.getPermissions();
      console.log("allPermissions>>>>>>>>>>>>", allPermissions);
      const assignPermissionsToRole = await userRole.addPermissions(
        allPermissions
      );
      console.log(
        "assignPermissionsToRole>>>>>>>>>>>",
        assignPermissionsToRole
      );

      const assignedRole = await newUser.addRole(userRole);
      console.log("assigned>?>>>>>>>>>>>>.", assignedRole);

      return sendSuccessResponse(
        res,
        201,
        newUser.dataValues,
        "Account created successfully"
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Could not perform operation at this time, kindly try again later.",
        e
      );
    }
  },

  /**
   * Description of the login controller.
   * @function signUp
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */

  async login(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const Role = new RolesModel(db.models.Role);
      const { email, password } = req.body;

      if (!email || !password) {
        return sendErrorResponse(
          res,
          400,
          "Incorrect login credentials. Kindly check and try again"
        );
      }
      const attributes = {
        exclude: ["createdAt", "updatedAt"],
      };
      const include = [
        {
          model: db.models.Role,
          as: "roles",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          through: { attributes: [] },
          include: [
            {
              model: db.models.Permission,
              as: "permissions",
              // attributes: []
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              through: { attributes: [] },
            },
          ],
        },
      ];
      const user = await User.getUser({ email }, attributes, include);
      console.log("user>>>>>>>>>>>>>", user);
      if (!user)
        return sendErrorResponse(
          res,
          404,
          "User does not exist with these credentials. Kindly check and try again"
        );
      const checkPassword = hash_compare(hash(password), user.passwordHash);
      if (!checkPassword) {
        return sendErrorResponse(
          res,
          400,
          "Incorrect login credentials. Kindly check and try again"
        );
      }

      const userRoles = await user.getRoles();
      if (!userRoles.length) {
        return sendErrorResponse(
          res,
          401,
          "User does not have any roles. Contact admin"
        );
      }

      const token = jwt.sign({ user_id: user.id, email }, "ASHLAR_GLOBAL", {
        expiresIn: "24h",
      });

      user.dataValues.token = token;
      return sendSuccessResponse(
        res,
        200,
        {
          user: user.dataValues,
        },
        "Login successfully"
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        "Server error, contact admin to resolve issue",
        e
      );
    }
  },

  async forgotPassword(req, res) {
    let db = await DBInitializer();
    const User = new UserModel(db.models.User);
    const { email } = req.body;

    if (!email) {
      return sendErrorResponse(
        res,
        400,
        "Email Missing! Kindly check and try again"
      );
    }
    let where = {
      email,
    };

    let user = await User.getUser({ email });

    if (!user) {
      return sendErrorResponse(
        res,
        404,
        "User does not exist with this email. Kindly check and try again"
      );
    }
    //generate code
    var recoveryCode = await recoveryCodeGenerator();
    //add recoveryCode to the user table
    const updatedRecoveryCode = await User.updateRecoverCode(
      { recoveryCode },
      where
    );
    console.log("updatedRecoveryCode>>>>>>>>>>", updatedRecoveryCode);
    //send code in email to the user
    const result = await emailSender(email, recoveryCode);
    if (result) {
      return sendSuccessResponse(
        res,
        200,
        {
          recoveryCode,
        },
        "Email has been sent successfully. Please verify ..."
      );
    } else {
      res.status(400).send("Error in sending Email!!!");
    }

    // the Location header to "/recover-password" and using the HTTP status code 307 (Temporary Redirect) to indicate that the client should use the same method (POST) when making the redirected request.
  },

  async recoverPassword(req, res) {
    let db = await DBInitializer();
    const User = new UserModel(db.models.User);
    const { password, confirmPassword, recoveryCode } = req.body;

    if (!recoveryCode) {
      return sendErrorResponse(
        res,
        400,
        "Recovery Code Missing! Kindly check and try again"
      );
    }

    if (!(confirmPassword == password)) {
      return sendErrorResponse(
        res,
        400,
        "Password and Confirm Password Fields don't match! Kindly check and try again"
      );
    }

    const passwordHash = hash(password);

    console.log(passwordHash);

    let where = {
      recoveryCode,
    };

    const updatePassword = await User.updatePassword({passwordHash}, where);

    if (updatePassword.length) {
      return sendSuccessResponse(
        res,
        200,
        {
          userRecord: updatePassword[1],
        },
        "Your password has been changed successfully"
      );
    } else {
      res.status(400).send("Error in updating password!!!");
    }
  },
};
