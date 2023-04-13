import axios from "./axios";

const Users = {
  /**
   * Fetches all Users's
   *
   * @return {array} Array of Users's
   */
  async get(perPage = 9999, currentPage = 0, pagesToLoad = 1) {
    try {
      const res = await axios.get("/users", {
        params: { perPage, currentPage, pagesToLoad },
      });
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches one Users by it's ID
   *
   * @param {string} id ID of the Users
   * @return {object} Users with the corresponding ID
   */
  async getById(usersId) {
    try {
      const res = await axios.get("/users/" + usersId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Users
   *
   * @param {object} users Object with the creation data
   * @return {object} Newly created Users
   */
  async create(users) {
    let reqBody = { ...users };

    try {
      const res = await axios.post("/users", reqBody);
      return {
        ok: true,
        data: res.data,
      };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Deletes Users by ID
   *
   * @param {string} usersId ID of the Users to be deleted
   * @return {string} ID of the deleted Users
   */
  async delete(usersId) {
    try {
      await axios.delete("/users/" + usersId);
      return {
        ok: true,
        data: {
          id: usersId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: usersId,
        },
      };
    }
  },

  async update(userId, body) {
    try {
      await axios.patch("/users/" + userId, { ...body });
      return {
        ok: true,
        data: {
          id: userId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: userId,
        },
      };
    }
  },

  /**
   * Add user image
   *
   * @param {file} users file with the image data
   * @param {string} userId userId to be updated
   * @return {object} Newly created file
   */
  async addPicture(userId, file) {
    try {
      const res = await axios.post(
        "/users/Profile/" + userId,
        { file },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return {
        ok: true,
        data: res.data,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        data: {},
      };
    }
  },

  /**
   * Update user image
   *
   * @param {file} users file with the image data
   * @param {string} userId userId to be updated
   * @return {object} Newly updated file
   */
  async updatePicture(userId, file) {
    try {
      const res = await axios.post(
        "/users/Profile/" + userId,
        { file },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return {
        ok: true,
        data: res.data,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        data: {},
      };
    }
  },

  async getUserPicture(fileId) {
    try {
      const { data: imgBlob } = await axios.get(`/users/profile/${fileId}`, {
        responseType: "blob",
      });

      const imgUrl = URL.createObjectURL(imgBlob);

      return {
        ok: true,
        data: imgUrl,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        data: {},
      };
    }
  },
  /**
   * Fetches all Users that contain the the specified string
   *
   * @param {string} text used to find Users
   * @return {object} Array of Users's
   */
  async searchUsers(text) {
    try {
      const res = await axios.get(`/users/findString/text?text=${text}`);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },
  /**
   * Change User password
   *
   * @param {string} email email of the Users to be updated
   * @param {string} newPassword new user password
   * @param {string} oldPassword old user password
   * @return {string} new password for the specific user
   */
  async changeUserPassword(email, oldPassword, newPassword) {
    try {
      const res = await axios.put("/users/user/reset_user_password", {
        email,
        oldPassword,
        newPassword,
      });
      const { data } = res;

      if (data.statusCode === 400) {
        return {
          ok: false,
          error: data.error,
          data: {},
        };
      } else {
        return {
          ok: true,
          data: data,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
        data: {},
      };
    }
  },

  /**
   * Reset User password
   *
   * @param {string} email email of the Users
   * @return {email} An email with a link will be sent to the user in question with is gonna be used to reset the password
   */
  async recoverPassword(email) {
    try {
      const res = await axios.post("/users/user/recover_password/" + email);
      const { data } = res;
      return {
        ok: true,
        data: data.message,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        data: {},
      };
    }
  },

  /**
   * Reset User password
   *
   * @param {string} token token of the Users
   * @return {email} a message with the updated user
   */
  async resetUserPassword(token, newPassword) {
    try {
      const res = await axios.put("/users/user/reset_password/" + token, {
        newPassword,
      });
      const { data } = res;
      return {
        ok: true,
        data: data.message,
      };
    } catch (error) {
      return {
        ok: false,
        error,
        data: {},
      };
    }
  },

  /**
   * Creates one user and sending email
   *
   * @param {object} users Object with the creation data
   * @return {object} Newly created Users
   */
  async createMemberAccount(member) {
    let reqBody = { ...member };

    try {
      const res = await axios.post("/users/Member", reqBody);
      return {
        ok: true,
        data: res.data,
      };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },
};

export default Users;
