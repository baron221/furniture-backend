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

  async getMemberArticlesData(member, mb_id, inquery) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectId(member._id);
      mb_id = shapeIntoMongooseObjectId(mb_id);
      const page = inquery["page"] ? inquery["page"] * 1 : 1;
      const limit = inquery["limit"] ? inquery["limit"] * 1 : 5;

      const result = await this.communitySchema.aggregate([
        { $match: { mb_id: mb_id, art_status: "active" } },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {$lookup:{
            from:"members",
            localField:"mb_id",
            foreignField:"_id",
            as:"member_data"
        }}
      ]).exec();
      assert.ok(result, Definer.general_err1);

      return result
    } catch (mongo_err) {
      throw new Error(Definer.auth_err1);
    }
  }
}
module.exports = Community;
