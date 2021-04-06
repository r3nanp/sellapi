# SellApi
> A API to make sells!


<div align="left">

![r3nanp](https://img.shields.io/badge/r3nanp-sellapi-color?style=for-the-badge&logo=node.js)
![license mit](https://img.shields.io/github/license/r3nanp/screen-recorder?color=blue&label=LICENSE&logo=github&style=for-the-badge)
![prs](https://img.shields.io/static/v1?label=PRs&message=welcome&style=for-the-badge&color=24B36B&labelColor=000000)

</div>

# Technologies used 🛠

- Node.js
- Express
- Yup
- TypeORM
- PostgreSQL

# Contributing 🎉

[Check this step by step](CONTRIBUTING.md)

<br />

# 👷‍♂️ Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```
git clone https://github.com/r3nanp/sellapi.git
```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you use a SSH key registered in your Github account, clone the project using this command:

```
git clone git@github.com:r3nanp/sellapi.git
```

**Install dependencies**

```
yarn install
```

Or

```
npm install
```

Create your enviroment variables based on the examples of ```.env.example```

```
cp .env.example .env
```

After copying the examples, make sure to fill the variables with new values.

**Setup a database**

Install [Postgres](https://www.postgresql.org/) to create a database or if you have [Docker](https://www.docker.com/) in your machine, fill the environment values related to database configurations and then run the following commands in order to create a Postgres container.

```docker-compose up -d```

# 🏃 Getting Started

Run the transactions in order to configure the database schema

```yarn typeorm migration:run```

Run the following command in order to start the application in a development environment:

```yarn dev```

# :closed_book: License

Released in 2021.
This project is under the [MIT license](LICENSE).

Made with love by [Renan Pereira](https://github.com/r3nanp) 💜🚀
