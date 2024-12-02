# Project work documentation

#### NHL Matches API

![](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)![](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)![](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

### Plan

##### Project Group:

- I will work alone

##### Subject:

- Create an API service for tracking statistics from NHL matches

##### Framework:

- GraphQL with Typescript

##### Storage:

- PostgreSQL

##### Special features:

- Semi-automated adding of new teams, player data is constructed automatically
- User can query for different statistics, matches, teams and players
- Detailed match view, featuring goals, assists, penalties etc.

##### Schedule:

- Nothing set in stone, I try to work on this daily, at least for a bit

---

### Features

#### Adding new teams

![](/documentation/images/addingNewTeam.png)

- New team is added if the given **team shorthand** belongs to a team that doesn't already exist, otherwise a corresponding error message is displayed
- In case no team is found with given shorthand, a corresponding error message is displayed
