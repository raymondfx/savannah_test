import { check, group } from 'k6';
import http from 'k6/http';

// Test configuration
export const options = {
  stages: [
    // Load Testing
    { duration: '5m', target: 50 },  // Ramp-up to 50 users
    { duration: '15m', target: 50 }, // Sustain
    { duration: '5m', target: 0 },   // Ramp-down
    
    // Stress Testing (uncomment to use)
    // { duration: '2m', target: 120 },
    // { duration: '2m', target: 150 },
    // { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2500'], // 95% requests <2.5s
    http_req_failed: ['rate<0.01'],    // <1% errors
  },
};

// Main test function
export default function () {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  group('Users API Test', () => {
    const response = http.get(`${BASE_URL}/users`);

    // Validate response structure
    check(response, {
      'Status is 200': (r) => r.status === 200,
      'Has users array': (r) => r.json().length > 0,
    });

    // Validate individual user properties
    if (response.status === 200) {
      const users = response.json();
      users.forEach(user => {
        check(user, {
          'User has ID': (u) => u.id !== undefined,
          'Valid email format': (u) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email),
          'Address exists': (u) => u.address !== null,
          'Company data present': (u) => u.company.name !== undefined,
        });
      });
    }
  });
}