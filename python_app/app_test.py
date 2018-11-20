from app import app

import unittest
import json

class CitiesTestCase(unittest.TestCase):

  def test_index(self):
    tester = app.test_client(self)
    response = tester.get('/cities.json', content_type='application/json')
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data, json.dumps({"cities" : ["Amsterdam", "Berlin", "New York", "San Francisco", "Tokyo"]}))

if __name__ == '__main__':
    unittest.main()
