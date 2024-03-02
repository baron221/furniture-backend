const CommunitySchema = require("../schema/community.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Community {
  constructor() {
    this.communitySchema = CommunitySchema;
  }
  async createArticleData(member, data) {
    try {
      data.mb_id = shapeIntoMongooseObjectId(member._id);
      const new_article = await this.saveArticleData(data);
      return new_article;
    } catch (err) {
      throw err;
    }
  }

  async saveArticleData(data) {
    try {
      const article = new this.communitySchema(data);
      return await article.save();
    } catch (mongo_err) {
      throw new Error(Definer.auth_err1);
    }
  }
}
module.exports = Community;
