# Project work documentation

#### NHL Matches API

![](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)![](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

### Plan

##### Project Group:

- I will work alone

##### Subject:

- Create an API service for tracking statistics from (imaginary) regular season NHL games

##### Framework:

- GraphQL with Typescript

##### Storage:

- PostgreSQL

##### Special features:

- Matches are added manually by providing required data
- User can query for different statistics, including: goals, assists, penalties
- Detailed match view, featuring goals, assists, penalties etc.

##### Schedule:

- Nothing set in stone, I try to work on this daily, at least for a bit

---

### Features

#### Adding a match event

![](/documentation/images/addingNewMatch.png)

- New match is added if the given data is valid, otherwise a corresponding error message is displayed
- In case no team is found with given shorthand, a corresponding error message is displayed

##### Example match data object

```
  "input": {
    "awayTeam": "Boston Bruins",
    "awayTeamScore": 4,
    "date": "2024-12-03T19:30:00",
    "goals": [
      {
        "assist": ["David Pastrnak", "Brad Marchand"],
        "period": 1,
        "powerPlay": false,
        "scorer": "Charlie McAvoy",
        "shortHanded": false,
        "timestamp": "2024-12-03T19:45:00"
      }
    ],
    "homeTeam": "Toronto Maple Leafs",
    "homeTeamScore": 3,
    "location": "Scotiabank Arena",
    "penalties": [
      {
        "additionalMinutes": null,
        "minutes": 2,
        "penalizedPlayer": "Auston Matthews",
        "period": 1,
        "timestamp": "2024-12-03T19:50:00",
        "type": "Tripping"
      },
    ],
    "referees": ["Gord Dwyer", "Frederick L'Ecuyer"]
  },
```

---

#### Query for match events

##### Get match by ID

![](/documentation/images/getMatchById.png)

- All saved matches can also be queried for at once

---

#### Query for player statistics

##### Example query for most goals, assists and penalty minutes

![](/documentation/images/statistics.png)
