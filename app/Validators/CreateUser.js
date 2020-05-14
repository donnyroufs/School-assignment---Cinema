"use strict";

class CreateUser {
  get rules() {
    return {
      username: "required:unique:users",
      password: "required",
    };
  }
  get messages() {
    return {
      required: "{{ field }} is required.",
      unique: "The {{ field }} already exists.",
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = CreateUser;
