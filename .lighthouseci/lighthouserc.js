module.exports = {
  ci: {
    collect: {
      /* Run LHCI against a locally started server */
      startServerCommand: 'npm run start',
      url: [ 'http://localhost:3000' ],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
