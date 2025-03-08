import { check, group } from 'k6';
import http from 'k6/http';
import { Trend, Rate } from 'k6/metrics';

// Custom metrics
const albumLatency = new Trend('album_latency');
const successRate = new Rate('successful_requests');
const contentErrors = new Rate('content_errors');

// Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp-up
    { duration: '10m', target: 50 },  // Sustained load
    { duration: '2m', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% requests <2s
    http_req_failed: ['rate<0.05'],     // <5% errors
    'successful_requests': ['rate>0.95'], // Success rate threshold
    'content_errors': ['rate<0.01']     // Content issues
  },
};

export default function () {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  group('Albums API Test', () => {
    const response = http.get(`${BASE_URL}/albums`);
    
    // Record custom metrics
    albumLatency.add(response.timings.duration);
    successRate.add(response.status === 200);
    
    // Validate basic response
    const statusCheck = check(response, {
      'Status is 200': (r) => r.status === 200,
      'Has albums array': (r) => r.json().length >= 100,
    });
    
    if (!statusCheck) {
      contentErrors.add(1);
      return;
    }

    // Validate album structure
    try {
      const albums = response.json();
      let validStructure = true;
      
      albums.forEach(album => {
        const isValid = check(album, {
          'Valid album ID': (a) => Number.isInteger(a.id) && a.id > 0,
          'Valid user ID': (a) => Number.isInteger(a.userId) && a.userId > 0,
          'Title exists': (a) => typeof a.title === 'string' && a.title.length > 0,
        });
        
        if (!isValid) validStructure = false;
      });
      
      if (!validStructure) contentErrors.add(1);
      
    } catch (e) {
      contentErrors.add(1);
    }
  });
}