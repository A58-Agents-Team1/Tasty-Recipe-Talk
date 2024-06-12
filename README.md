<img src="https://firebasestorage.googleapis.com/v0/b/tasty-recipe-talk-e24f0.appspot.com/o/profileImages%2Fadmin?alt=media&token=8a9d206b-4aa3-42bd-99c5-455f841ea1d9" width="150" height="150">

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Ffeatures.png?alt=media&token=e5fc5779-b3db-41c2-a576-947ca382ea5a&_gl=1*81oei1*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTgzLjAuMC4w"  width="30" height="30"> Tasty-Recipe-Talk

Forum System, where the users can create posts, add comments, and upvote/downvote the things that they like or dislike the most.

**Languages:** <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" height="20"> <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" height="20">

**Frameworks/Libraries:** <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" height="20"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" height="20"> <img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white" height="20"> <img src="https://camo.githubusercontent.com/285fdadfaf59ede5da219ccf9f8278322e8f85cfa48f5ba33df53ce2f0c72098/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f566974652d4237334246453f7374796c653d666f722d7468652d6261646765266c6f676f3d76697465266c6f676f436f6c6f723d464644363245" height='20'>

**Linters:** <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" height="20">

**Databases:** <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" height="20">

**Browsers:** <img src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Edge-0078D7?style=for-the-badge&logo=Microsoft-edge&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white" height="20"> <img src="https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white" height="20">

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fstart.png?alt=media&token=ee8cc2b3-1a61-4519-9f96-59177216b4d6&_gl=1*t5p8co*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc4MDEzLjAuMC4w"  width="30" height="30"> Getting Started

To install and run the project, follow these steps:

1. Clone the [Tasty Recipe Talk GitHub repository](https://github.com/A58-Agents-Team1/Tasty-Recipe-Talk) locally:

```bash
git clone https://github.com/A58-Agents-Team1/Tasty-Recipe-Talk.git
```

2. Navigate to the project directory:

```bash
cd Tasty-Recipe-Talk
```

3. Install project dependencies:

```bash
npm install
```

4. To run the project, use the following command:

```bash
npm run dev
```

5. Open localhost link in browser to view web-platform.

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fresources.png?alt=media&token=9fe5f5ee-5413-4af3-a50b-c7f01650d1fe&_gl=1*4u0xo2*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTk4LjAuMC4w"  width="30" height="30"> About

Tasty Recipe Talk is an open source, collaborative, and minimalist recipe and cooking site. We aim to provide a platform for users to share and discuss recipes, cooking techniques, and food-related topics. Our goal is to create a community of food enthusiasts who are passionate about cooking and sharing their culinary creations with others. We believe that everyone has something to contribute, whether it's a family recipe that has been passed down for generations or a new twist on a classic dish. So come join us and let's talk tasty recipes!

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fdatabase.png?alt=media&token=958f4c41-6532-4e07-a31d-e437ebe00527&_gl=1*o97b6d*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTQ0LjAuMC4w"  width="30" height="30"> Database Scheme (Structure)

### Posts document:

```js
posts: {
  uid: {
    author: <string>,
    comments: { <object> (optional)
      uid: { <object>
        author: <string>,
        content: <string>,
        createdOn: <number>,
        lastEdited: <number>,
        likedBy: { <object>
          handle: <boolean>,
          ...
        }
      }
      ...
    },
    content: <string>,
    createdBy: <number>,
    likedBy: { <object> (optional)
      handle: <boolean>
      ...
    },
    recipe: <string>,
    title: <string>,
    }
    ...
  }

```

### Users document:

```js
{
  users: {
    username: {
      email: <string>,
      firstName: <string>,
      handle: <string>,
      isBlocked: <boolean>,
      lastName: <string>,
      likedComments: { <object> (optional)
        uid: <boolean>
      },
      likedPosts: { <object> (optional)
        uid: <boolean>
        ...
      },
      uid: <number>,
      userRole: <string>
  }
  ...
}}
```

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Ffaq.png?alt=media&token=12b5c59f-8faf-4cba-98f4-b6cd9329b78b&_gl=1*9f9cxq*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTYxLjAuMC4w"  width="30" height="30"> Contributing

We welcome contributions from anyone who is interested in sharing their knowledge and passion for cooking. Whether you're a seasoned chef or a novice cook, we encourage you to get involved and help us build a diverse and vibrant community of food lovers. Here are a few ways you can contribute:

- Submit a recipe: Share your favorite recipes with the community and help inspire others to get cooking.
- Comment on recipes: Leave feedback, suggestions, and tips on recipes to help others improve their cooking skills.
- Start a discussion: Initiate a conversation about a food-related topic that interests you and engage with other users who share your passion.
- Report issues: If you encounter any bugs, errors, or other issues with the site, please let us know so we can address them promptly.
- Spread the word: Tell your friends, family, and social networks about Tasty Recipe Talk and help us grow our community.
  We look forward to hearing from you and seeing what delicious recipes you have to share!
  Open source, collaborative, and minimalist recipe and cooking site.

## <img src="https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2FREADME-images%2Fcommunity.png?alt=media&token=893ecd6f-908b-4c1e-9223-25d82f1bb8b1&_gl=1*watnuy*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjU3Njg5Ni4xMDMuMS4xNjg2NTc3OTI1LjAuMC4w"  width="30" height="30"> Community and Contributions

- The `Tasty Recipe Talk` platform is developed by **Team 1** (Tihomir Denev, Radoslav Marinov and Tanya Jecheva).
