const logger = require("../logger")(__filename);

module.exports = (profile) => {
  if (!profile.profile) {
    logger.warn("Profile Not Found!");
  }

  profile.positions.forEach((position) => {
    if (position.title) {
      position.title = position.title.replace("Company Name\n", "");
    }
    if (position.description) {
      position.description = position.description.replace("See more", "");
      position.description = position.description.replace("see more", "");
      position.description = position.description.replace("See less", "");
    }
    if (position.roles) {
      position.roles.forEach((role) => {
        if (role.title) {
          role.title = role.title.replace("Title\n", "");
        }
        if (role.description) {
          role.description = role.description.replace("See more", "");
          role.description = role.description.replace("see more", "");
        }
      });
    }
  });

  return profile;
};
