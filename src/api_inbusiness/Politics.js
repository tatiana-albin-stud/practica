import axios from "./axios";

const Politics = {
  /**
   * Fetches all Politics's
   *
   * @return {array} Array of Politics's
   */
  async get(perPage, currentPage, pagesToLoad) {
    try {
      const res = await axios.get("/politics", {
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
   * Fetches one Politics by it's ID
   *
   * @param {string} id ID of the Politics
   * @return {object} Politics with the corresponding ID
   */
  async getById(politicsId) {
    try {
      const res = await axios.get("/politics/" + politicsId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Politics
   *
   * @param {object} politics Object with the creation data
   * @return {object} Newly created Politics
   */
  async create(politics) {
    let reqBody = { ...politics };
    try {
      const res = await axios.post("/politics", reqBody);
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
   * Deletes Politics by ID
   *
   * @param {string} politicsId ID of the Politics to be deleted
   * @return {string} ID of the deleted Politics
   */
  async delete(politicsId) {
    try {
      await axios.delete("/politics/" + politicsId);
      return {
        ok: true,
        data: {
          id: politicsId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: politicsId,
        },
      };
    }
  },
};

export default Politics;
