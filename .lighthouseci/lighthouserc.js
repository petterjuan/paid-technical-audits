module.exports = {
  ci: {
    collect: {
      /* Run LHCI against a locally started server */
      startServerCommand: 'npm run start',
      url: [ 'http://localhost:3000' ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        // Fail PR if overall performance score < 0.9
        'categories:performance': ['error', {minScore: 0.9}],
        // Largest Contentful Paint (ms)
        'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        // First Contentful Paint (ms)
        'first-contentful-paint': ['error', {maxNumericValue: 1500}],
        // Total Blocking Time (ms)
        'total-blocking-time': ['error', {maxNumericValue: 300}],
        // Cumulative Layout Shift
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
