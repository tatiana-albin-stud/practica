import axios from "./axios";

const Participants = {
  /**
   * Fetches all Participants's
   *
   * @return {array} Array of Participants's
   */
  async get(eventId) {
    try {
      const res = await axios.get(`/participants?eventId=${eventId}`);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches the participant status by id and event id
   *
   * @return {array} Array of Participants's
   */
  async getStatus(userId, eventId) {
    try {
      const res = await axios.get("/participants/status/byUserEventId", {
        params: {
          userId: userId,
          eventId: eventId.id,
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
   * Fetches one Participants by it's ID
   *
   * @param {string} id ID of the Participants
   * @return {object} Participants with the corresponding ID
   */
  async getById(participantsId) {
    try {
      const res = await axios.get("/participants/" + participantsId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Participants
   *
   * @param {object} participants Object with the creation data
   * @return {object} Newly created Participants
   */
  async create(participants) {
    let reqBody = { ...participants };
    try {
      const res = await axios.post("/participants", reqBody);
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
   * Deletes Participants by ID
   *
   * @param {string} participantsId ID of the Participants to be deleted
   * @return {string} ID of the deleted Participants
   */
  async delete(participantsId) {
    try {
      await axios.delete("/participants/" + participantsId);
      return {
        ok: true,
        data: {
          id: participantsId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: participantsId,
        },
      };
    }
  },
  /**
   * Fetches one Participant number of participations on event as guest
   *
   * @param {string} id ID of the Participant
   * @return {number} number of times participated
   */
  async getNoOfParticipationsAsGuest(userId) {
    try {
      const res = await axios.get(
        "/participants/numberOf/Participations/userId",
        {
          params: {
            userId,
          },
        }
      );
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },
};

export default Participants;
