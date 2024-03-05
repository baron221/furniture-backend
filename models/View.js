const ViewModel = require("../schema/view.model");
const MemberModel = require("../schema/member.model");
const ProductModel = require("../schema/product.model");
const CommunityModel = require("../schema/community.model");

class View {
  constructor(mb_id) {
    this.viewModel = ViewModel;
    this.memberModel = MemberModel;
    this.productModel = ProductModel;
    this.communityModel = CommunityModel;
    this.mb_id = mb_id;
  }

  async validateChosenTarget(view_ref_id, group_type) {
    try {
      let result;
      switch (group_type) {
        case "member":
          result = await this.memberModel
            .findOne({ _id: view_ref_id, mb_status: "ACTIVE" })
            .exec();
          break;
        case "product":
          result = await this.productModel
            .findOne({ _id: view_ref_id, product_status: "PROCESS" })
            .exec();
          break;
        case "community":
          result = await this.communityModel
            .findOne({ _id: view_ref_id, art_status: "active" })
            .exec();
          break;
      }
      return !!result;
    } catch (err) {
      throw err;
    }
  }

  async insertMemberView(view_ref_id, group_type) {
    try {
      const new_view = new this.viewModel({
        mb_id: this.mb_id,
        view_ref_id: view_ref_id,
        view_group: group_type,
      });
      const result = await new_view.save();
      //views sonini 1 taga oshrish
      await this.modifyItemViewCounts(view_ref_id, group_type);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async modifyItemViewCounts(view_ref_id, group_type) {
    try {
      switch (group_type) {
        case "member":
          await this.memberModel
            .findByIdAndUpdate({ _id: view_ref_id }, { $inc: { mb_views: 1 } })
            .exec();
          break;
        case "product":
          await this.productModel
            .findByIdAndUpdate(
              { _id: view_ref_id },
              { $inc: { product_views: 1 } }
            )
            .exec();
          break;
        case "community":
          await this.communityModel
            .findByIdAndUpdate({ _id: view_ref_id }, { $inc: { art_views: 1 } })
            .exec();
          break;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }
  async checkViewExistence(view_ref_id) {
    try {
      const view = await this.viewModel
        .findOne({ mb_id: this.mb_id, view_ref_id: view_ref_id })
        .exec();
      return view ? true : false;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = View;
