Slingshot.fileRestrictions("Thumbnails", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  maxSize: 2 * 1024 * 1024 // 2 MB (use null for unlimited)
});


Slingshot.createDirective("Thumbnails", Slingshot.S3Storage, {
  bucket: "justcause-photos", // s3's bucket name
  acl: "public-read",

  authorize: function (file, metaContext) {

    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file, metaContext) {
    // Image stored under context:
    return metaContext.type + "/" + Date.now() + "-" + file.name;
  }
});
