const profileSelector = ".core-rail > *:first-child section >";

const template = {
  profile: {
    selector: ".pv-text-details__left-panel",
    fields: {
      name: `h1`,
      location: ".text-body-small",
    },
  },
  positions: {
    selector:
      "#experience-section li:not(.pv-entity__position-group-role-item)",
    fields: {
      title: "h3",
      link: {
        selector: "a",
        attribute: "href",
      },
      url: {
        selector: "a",
        attribute: "href",
      },
      companyName: ".pv-entity__secondary-title",
      location: ".pv-entity__location span:last-child",
      description: ".pv-entity__description",
      date1: ".pv-entity__date-range span:last-child",
      date2: ".pv-entity__bullet-item-v2",
      roles: {
        selector: "li",
        hasChildrenFields: true,
        fields: {
          title: "h3",
          description: ".pv-entity__description",
          date1: ".pv-entity__date-range span:last-child",
          date2: ".pv-entity__bullet-item-v2",
          location: ".pv-entity__location span:last-child",
        },
      },
    },
  },
  educations: {
    selector: "#education-section li",
    fields: {
      title: "h3",
      degree: "span[class=pv-entity__comma-item]",
      url: {
        selector: "a",
        attribute: "href",
      },
      fieldOfStudy: "p.pv-entity__fos span:nth-child(2)",
      date1: ".pv-entity__dates time:nth-child(1)",
      date2: ".pv-entity__dates time:nth-child(2)",
      description: ".pv-entity__description",
    },
  },
  skills: {
    selector: ".pv-skill-category-entity__skill-wrapper",
    fields: {
      title: ".pv-skill-category-entity__name-text",
      count: ".pv-skill-category-entity__endorsement-count",
    },
  },
};

module.exports = template;
