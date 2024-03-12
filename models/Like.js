const LikeModel = require("../schema/like.model");
const MemberModel = require("../schema/member.model");
const ProductModel = require("../schema/product.model");
const CommunityModel = require("../schema/community.model");
const Definer = require("../lib/mistake");

class Like {
  constructor(mb_id) {
    this.likeModel = LikeModel;
    this.memberModel = MemberModel;
    this.productModel = ProductModel;
    this.communityModel = CommunityModel;
    this.mb_id = mb_id;
  }

  async validateTargetItem(id, group_type) {
    try {
      let result;
      switch (group_type) {
        case "member":
          result = await this.memberModel
            .findOne({
              _id: id,
              mb_status: "ACTIVE",
            })
            .exec();
          break;
        case "product":
          result = await this.productModel
            .findOne({
              _id: id,
              mb_status: "PROCESS",
            })
            .exec();
          break;
        case "community":
        default:
          result = await this.communityModel
            .findOne({
              _id: id,
              mb_status: "active",
            })
            .exec();
          break;
      }
      return !!result;
    } catch (err) {
      throw err;
    }
  }
  async checkLikeExistence(like_ref_id) {
    try {
      const like = await this.likeModel
        .findOne({
          mb_id: this.mb_id,
          like_ref_id: like_ref_id,
        })
        .exec();
      return !!like;
    } catch (err) {}
  }

  async removeMemberLike(like_ref_id, group_type) {
    try {
      const result = await this.likeModel
        .findOneAndDelete({
          like_ref_id: like_ref_id,
          mb_like: this.mb_id,
        })
        .exec();
      await this.modifyItemLikeCounts(like_ref_id, group_type, -1);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async insertMemberLike(like_ref_id, group_type) {
    try {
      const new_like = new this.likeModel({
        mb_id: this.mb_id,
        like_ref_id: like_ref_id,
        like_group: group_type,
      });
      const result = await new_like.save();
      await this.modifyItemLikeCounts(like_ref_id, group_type, 1);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(Definer.auth_err1);
    }
  }

  async modifyItemLikeCounts(like_ref_id, group_type, modifier) {
    try {
      switch (group_type) {
        case "member":
          await this.memberModel
            .findByIdAndUpdate({ _id: like_ref_id }, { $inc: { mb_likes: modifier } })
            .exec();
          break;
        case "product":
          await this.productModel
            .findByIdAndUpdate(
              { _id: like_ref_id },
              { $inc: { product_likes: modifier } }
            )
            .exec();
          break;
        case "community":
        default:
          await this.communityModel
            .findByIdAndUpdate({ _id: like_ref_id }, { $inc: { art_likes: modifier } })
            .exec();
          break;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Like;
