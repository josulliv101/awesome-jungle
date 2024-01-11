export const tagsConfig = {
  city: {
    person: {
      politics: true,
      musician: true,
      sports: true,
      actor: true,
      comedian: true,
      "film-maker": true,
    },
    movie: {
      comedy: true,
      action: true,
      thriller: true,
      documentary: true,
    },
    college: {
      professor: true,
    },
  },
  movie: {
    comedy: true,
    action: true,
    thriller: true,
    documentary: true,
  },
  person: {
    politics: true,
    musician: true,
    sports: true,
    actor: true,
    comedian: true,
    "film-maker": true,
  },
  college: {},
};

export type TagsConfig = typeof tagsConfig;
