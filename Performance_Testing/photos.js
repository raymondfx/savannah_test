import { check, group } from 'k6';
import http from 'k6/http';
import { Trend, Rate } from 'k6/metrics';

// Custom metrics
const photoLatency = new Trend('photo_latency');
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
    'successful_requests': ['rate>0.95'],
    'content_errors': ['rate<0.01']
  },
};

export default function () {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  group('Photos API Test', () => {
    const response = http.get(`${BASE_URL}/photos`);
    
    // Record metrics
    photoLatency.add(response.timings.duration);
    successRate.add(response.status === 200);
    
    // Basic response validation
    const statusCheck = check(response, {
      'Status is 200': (r) => r.status === 200,
      'Has photos array': (r) => r.json().length >= 5000,
    });
    
    if (!statusCheck) {
      contentErrors.add(1);
      return;
    }

    // Validate photo structure
    try {
      const photos = response.json();
      let validStructure = true;
      
      photos.forEach(photo => {
        const isValid = check(photo, {
          'Valid albumId': (p) => Number.isInteger(p.albumId) && p.albumId > 0,
          'Valid photo ID': (p) => Number.isInteger(p.id) && p.id > 0,
          'Valid title': (p) => typeof p.title === 'string' && p.title.length > 0,
          'Valid URL': (p) => p.url.startsWith('https://via.placeholder.com/'),
          'Valid thumbnail': (p) => p.thumbnailUrl.startsWith('https://via.placeholder.com/150/')
        });
        
        if (!isValid) validStructure = false;
      });
      
      if (!validStructure) contentErrors.add(1);
      
    } catch (e) {
      contentErrors.add(1);
    }
  });
}