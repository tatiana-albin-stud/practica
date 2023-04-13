import axios from "./axios";

const Proposedevents = {
  /**
   * Fetches all Proposedevents's
   *
   * @return {array} Array of Proposedevents's
   */
  async get() {
    try {
      const res = await axios.get("/proposedevents");
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches one Proposedevents by it's ID
   *
   * @param {string} id ID of the Proposedevents
   * @return {object} Proposedevents with the corresponding ID
   */
  async getById(proposedeventsId) {
    try {
      const res = await axios.get("/proposedevents/" + proposedeventsId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Proposedevents
   *
   * @param {object} proposedevents Object with the creation data
   * @return {object} Newly created Proposedevents
   */
  async create(proposedevents) {
    let reqBody = { ...proposedevents };
    try {
      const res = await axios.post("/proposedevents", reqBody);
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
   * Deletes Proposedevents by ID
   *
   * @param {string} proposedeventsId ID of the Proposedevents to be deleted
   * @return {string} ID of the deleted Proposedevents
   */
  async delete(proposedeventsId) {
    try {
      await axios.delete("/proposedevents/" + proposedeventsId);
      return {
        ok: true,
        data: {
          id: proposedeventsId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: proposedeventsId,
        },
      };
    }
  },
};

export default Proposedevents;
