<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/tasty-recipe-talk-e24f0.appspot.com/o/profileImages%2Fadmin?alt=media&token=8a9d206b-4aa3-42bd-99c5-455f841ea1d9" width="150" height="150">
</p>

# 🍔 Tasty Recipe Talk

<p align="center">
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React" /></a>
  <a href="https://chakra-ui.com/" target="_blank"><img src="https://img.shields.io/badge/Chakra%20UI-2.8.2-teal?logo=chakraui" alt="Chakra UI" /></a>
  <a href="https://firebase.google.com/" target="_blank"><img src="https://img.shields.io/badge/Firebase-10.11.1-yellow?logo=firebase" alt="Firebase" /></a>
  <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-5.2-purple?logo=vite" alt="Vite" /></a>
  <a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/ESLint-8.57.0-purple?logo=eslint" alt="ESLint" /></a>
  <a href="https://github.com/A58-Agents-Team1/Tasty-Recipe-Talk/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/A58-Agents-Team1/Tasty-Recipe-Talk?color=blue" alt="License" /></a>
  <a href="https://tasty-recipe-talk.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Live%20Demo-online-brightgreen" alt="Live Demo" /></a>
</p>

**Tasty Recipe Talk** is a forum where users can create posts, add comments, and upvote/downvote recipes they love (or dislike). Join our community of food enthusiasts to share, discover, and discuss your favorite recipes!

---

## 🚀 Live Demo

Check out the live app here: [Tasty Recipe Talk Live Demo](https://tasty-recipe-talk.vercel.app/)

---

## 🏁 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/A58-Agents-Team1/Tasty-Recipe-Talk.git
   cd Tasty-Recipe-Talk
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open** the provided localhost link in your browser to view the app.

---

## 📖 About

Tasty Recipe Talk is an open-source, collaborative, and minimalist recipe and cooking platform. Our mission is to provide a space for users to share and discuss recipes, cooking techniques, and food-related topics. Whether you have a family recipe or a new twist on a classic dish, everyone is welcome!

---

## ✨ Features

- **User Authentication:** Register, log in, and manage your profile securely.
- **Recipe Management:** Create, view, edit, and delete your own recipes.
- **Comment System:** Add, edit, and delete comments on recipes.
- **Like/Dislike System:** Upvote or downvote recipes and comments.
- **Image Upload:** Attach images to your recipes for a visual touch.
- **Search & Filter:** Find recipes by title, likes, comments, or author.
- **Admin Controls:** Block/unblock users and manage community safety.
- **Real-time Updates:** See new posts, likes, and comments instantly.
- **Giphy Integration:** Add fun cooking GIFs to your experience.
- **Persistent Data:** All data is stored and synced via Firebase.

---

## 🛠️ Technologies Used

- ![React](https://img.shields.io/badge/React-18-blue?logo=react) **React 18** – Modern UI library for building fast, interactive interfaces.
- ![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.8.2-teal?logo=chakraui) **Chakra UI** – Accessible, modular, and customizable component library.
- ![React Router](https://img.shields.io/badge/React%20Router-6.23.0-red?logo=reactrouter) **React Router** – Declarative routing for React applications.
- ![Firebase](https://img.shields.io/badge/Firebase-10.11.1-yellow?logo=firebase) **Firebase** – Authentication, Realtime Database, and Storage.
- ![Vite](https://img.shields.io/badge/Vite-5.2-purple?logo=vite) **Vite** – Next-generation frontend tooling for fast development.
- ![ESLint](https://img.shields.io/badge/ESLint-8.57.0-purple?logo=eslint) **ESLint** – Code quality and consistency.
- ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.1.7-pink?logo=framer) **Framer Motion** – Animations and transitions.
- ![PropTypes](https://img.shields.io/badge/PropTypes-15.8.1-blue) **PropTypes** – Runtime type checking for React props.

---

## 🗄️ Database Structure

### Posts

```js
posts: {
  uid: {
    author: <string>,
    comments: {
      uid: {
        author: <string>,
        content: <string>,
        createdOn: <number>,
        lastEdited: <number>,
        likedBy: { handle: <boolean>, ... }
      },
      ...
    },
    content: <string>,
    createdBy: <number>,
    likedBy: { handle: <boolean>, ... },
    recipe: <string>,
    title: <string>,
  },
  ...
}
```

### Users

```js
users: {
  username: {
    email: <string>,
    firstName: <string>,
    handle: <string>,
    isBlocked: <boolean>,
    lastName: <string>,
    likedComments: { uid: <boolean> },
    likedPosts: { uid: <boolean>, ... },
    uid: <number>,
    userRole: <string>
  },
  ...
}
```

---

## 🤝 Contributing

We welcome contributions from everyone! Here's how you can help:

- **Submit a recipe:** Share your favorite recipes with the community.
- **Comment on recipes:** Leave feedback, suggestions, and tips.
- **Start a discussion:** Engage with others on food-related topics.
- **Report issues:** Found a bug? Let us know!
- **Spread the word:** Share Tasty Recipe Talk with your friends and networks.

Open source, collaborative, and minimalist recipe and cooking site.

---

## 👥 Authors

- [Tanya Zhecheva](https://github.com/TanyaZhecheva)
- [Tihomir Denev](https://github.com/TihomirDenev)
- [Radoslav Marinov](https://github.com/Radoslav-Marinovv)

---

**Let's talk tasty recipes!**
