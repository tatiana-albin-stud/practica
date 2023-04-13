import axios from "./axios";

const Education = {
  /**
   * Fetches all Education's
   *
   * @return {array} Array of Education's
   */
  async get() {
    try {
      const res = await axios.get("/education");
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches all Education categories
   *
   * @return {array} Array of Education's
   */
  async getCategories() {
    try {
      const res = await axios.get("/educationCategories");
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: [],
      };
    }
  },

  /**
   * Fetches one Education by it's ID
   *
   * @param {string} id ID of the Education
   * @return {object} Education with the corresponding ID
   */
  async getById(educationId) {
    try {
      const res = await axios.get("/education/" + educationId);
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },
  /**
   * Fetches one category education by it's ID
   *
   * @param {string} id ID of the category Education
   * @return {object} category Education with the corresponding ID
   */
  async getByCategoryId(
    categoryEducationId,
    perPage = 9999,
    currentPage = 0,
    pagesToLoad = 1
  ) {
    try {
      const res = await axios.get("/education/findBy/EducationCategories/id", {
        params: {
          educationCategoriesId: categoryEducationId,
          perPage,
          currentPage,
          pagesToLoad,
        },
      });
      return { ok: true, data: res.data };
    } catch (error) {
      return {
        ok: false,
        data: {},
      };
    }
  },

  /**
   * Creates one Education
   *
   * @param {object} education Object with the creation data
   * @return {object} Newly created Education
   */
  async create(education) {
    let reqBody = { ...education };
    try {
      const res = await axios.post("/education", reqBody);
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
   * Creates one Education
   *
   * @param {object} education Object with the creation data
   * @return {object} Newly created Education
   */
  async createCategory(education) {
    let reqBody = { ...education };
    try {
      const res = await axios.post("/educationCategories", reqBody);
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

  async updateCategory(id, category) {
    try {
      const res = await axios.patch("/educationCategories/" + id, category);
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

  async updateResource(id, resource) {
    try {
      const res = await axios.patch("/education/" + id, resource);
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
   * Deletes Education by ID
   *
   * @param {string} educationId ID of the Education to be deleted
   * @return {string} ID of the deleted Education
   */
  async deleteResource(educationId) {
    try {
      await axios.delete("/education/" + educationId);
      return {
        ok: true,
        data: {
          id: educationId,
        },
      };
    } catch (error) {
      return {
        ok: false,
        data: {
          id: educationId,
        },
      };
    }
  },
};

export default Education;
