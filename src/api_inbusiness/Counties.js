import axios from "./axios";

const Counties = {
  /**
   * Fetches all Counties's
   *
   * @return {array} Array of Counties's
   */
  async get() {
    try {
      const res = await axios.get("/counties");
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches one Counties by it's ID
   *
   * @param {string} id ID of the Counties
   * @return {object} Counties with the corresponding ID
   */
  async getById(countiesId) {
    try {
      const res = await axios.get("/counties/" + countiesId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Counties
   *
   * @param {object} counties Object with the creation data
   * @return {object} Newly created Counties
   */
  async create(counties) {
    let reqBody = { ...counties };
    try {
      const res = await axios.post("/counties", reqBody);
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
   * Deletes Counties by ID
   *
   * @param {string} countiesId ID of the Counties to be deleted
   * @return {string} ID of the deleted Counties
   */
  async delete(countiesId) {
    try {
      await axios.delete("/counties/" + countiesId);
      return {
        ok: true,
        data: {
          id: countiesId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: countiesId,
        },
      };
    }
  },
};

export default Counties;
