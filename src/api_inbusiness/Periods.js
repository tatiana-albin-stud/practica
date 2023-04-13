import axios from "./axios";

const Periods = {
  /**
   * Fetches all Periods's
   *
   * @return {array} Array of Periods's
   */
  async get(userId) {
    try {
      const res = await axios.get("/periods", {
        params: {
          userId,
        },
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
   * Fetches one Periods by it's ID
   *
   * @param {string} id ID of the Periods
   * @return {object} Periods with the corresponding ID
   */
  async getById(periodsId) {
    try {
      const res = await axios.get("/Periods/" + periodsId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Periods
   *
   * @param {object} periods Object with the creation data
   * @return {object} Newly created Periods
   */
  async create(periods) {
    let reqBody = { ...periods };
    try {
      const res = await axios.post("/Periods", reqBody);
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
   * Deletes Periods by ID
   *
   * @param {string} periodsId ID of the Periods to be deleted
   * @return {string} ID of the deleted Periods
   */
  async delete(periodsId) {
    try {
      await axios.delete("/Periods/" + periodsId);
      return {
        ok: true,
        data: {
          id: periodsId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: periodsId,
        },
      };
    }
  },

  async update(periodId, body) {
    try {
      await axios.patch("/Periods/" + periodId, { ...body });
      return {
        ok: true,
        data: {
          id: periodId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: periodId,
        },
      };
    }
  },
};

export default Periods;
