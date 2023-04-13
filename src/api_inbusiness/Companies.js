import axios from "./axios";

const Companies = {
  /**
   * Fetches all Companies's
   *
   * @return {array} Array of Companies's
   */
  async get() {
    try {
      const res = await axios.get("/companies");
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches one Companies by it's ID
   *
   * @param {string} id ID of the Companies
   * @return {object} Companies with the corresponding ID
   */
  async getById(companiesId) {
    try {
      const res = await axios.get("/companies/" + companiesId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Companies
   *
   * @param {object} companies Object with the creation data
   * @return {object} Newly created Companies
   */
  async create(companies) {
    let reqBody = { ...companies };

    try {
      const res = await axios.post("/companies", reqBody);
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
   * Deletes Companies by ID
   *
   * @param {string} companiesId ID of the Companies to be deleted
   * @return {string} ID of the deleted Companies
   */
  async delete(companiesId) {
    try {
      await axios.delete("/companies/" + companiesId);
      return {
        ok: true,
        data: {
          id: companiesId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: companiesId,
        },
      };
    }
  },

  /**
   * Ger company logo
   *
   * @param {string} fileId id of the file
   * @return {object} logo picture
   */
  async getCompaniesLogos(fileId) {
    try {
      const { data: imgBlob } = await axios.get(
        `/Companies/profile/${fileId}`,
        {
          responseType: "blob",
        }
      );

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

  async addPicture(companyId, file) {
    try {
      const res = await axios.post(
        "/Companies/addLogo/" + companyId,
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
   * Update Clientsource by ID
   *
   * @param {object} compnayData Object with the creation data
   * @param {string} companyId ID of the compnay to be updated
   * @return {string} ID of the updated company
   */
  async update(companyId, companyData) {
    let reqBody = { ...companyData };
    try {
      const res = await axios.patch("/Companies/" + companyId, reqBody);
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
};

export default Companies;
