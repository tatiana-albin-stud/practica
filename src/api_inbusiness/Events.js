import axios from "./axios";

const Events = {
  /**
   * Fetches all Events's
   *
   * @return {array} Array of Events's
   */
  async get() {
    try {
      const res = await axios.get("/events");
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches one Events by it's ID
   *
   * @param {string} id ID of the Events
   * @return {object} Events with the corresponding ID
   */
  async getById(eventsId) {
    try {
      const res = await axios.get("/events/" + eventsId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Events
   *
   * @param {object} events Object with the creation data
   * @return {object} Newly created Events
   */
  async create(events) {
    let reqBody = { ...events };
    try {
      const res = await axios.post("/events", reqBody);
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
   * Send one email
   *
   * @param {object} events Object with the email data
   * @return {object} Newly created email
   */
  async sendEmail(details) {
    let reqBody = { ...details };
    try {
      const res = await axios.post("/emails", reqBody);
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
   * Update Event by ID
   *
   * @param {string} eventsId ID of the Events to be updated
   * @return {string} ID of the updated Events
   */

  async update(id, event) {
    try {
      const res = await axios.patch("/events/" + id, event);
      return {
        ok: true,
        data: res.data,
      };
    } catch (error) {
      return {
        ok: false,
        data: error,
      };
    }
  },

  /**
   * Deletes Events by ID
   *
   * @param {string} eventsId ID of the Events to be deleted
   * @return {string} ID of the deleted Events
   */
  async delete(eventsId) {
    try {
      await axios.delete("/events/" + eventsId);
      return {
        ok: true,
        data: {
          id: eventsId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: eventsId,
        },
      };
    }
  },
  /**
   * Fetches events for each user
   *
   * @return {array} Array of Events's
   */
  async getEventsByUserId(userId) {
    try {
      const res = await axios.get("/events/events/byUserId", {
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
   * Add user to event presence
   *
   * @param {object} events Object with the creation data
   * @return {object} Newly created presence object
   */
  async createUserPresence(presence) {
    let reqBody = { ...presence };
    console.log(reqBody, "din ai");
    try {
      const res = await axios.post(
        `/events/confirmPresence?userId=${reqBody.userId}&eventId=${reqBody.eventId}`
      );
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

export default Events;
