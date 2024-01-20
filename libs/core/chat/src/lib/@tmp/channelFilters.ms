supabase pg_notify


When querying on chat home screen:
```
"filters": {
    "filter_conditions": {
      "type": "messaging",
      "members": {
        "$in": [
          "fb9c6286-c8ab-4337-ab28-5c2365117f71"
        ]
      }
    },
    "sort": [
      {
        "field": "last_updated",
        "direction": -1
      }
    ],
    "state": true,
    "watch": true,
    "presence": true,
    "limit": 30,
    "offset": 0
  },
  ```


  when querying on create chant direct messaging
  ````
"filters": {
    "filter_conditions": {
      "distinct": true,
      "members": [
        "fb9c6286-c8ab-4337-ab28-5c2365117f71",
        "fb9c6286-c8ab-4337-ab28-5c2365117f71",
        "7eed72ab-5fe7-456e-942e-ec350413acbb"
      ]
    },
    "sort": [],
    "state": true,
    "watch": false,
    "presence": false
  },
```
