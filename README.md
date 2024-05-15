# Tasty-Recipe-Talk

Open source, collaborative, and minimalist recipe and cooking site.

## About

Tasty Recipe Talk is an open source, collaborative, and minimalist recipe and cooking site. We aim to provide a platform for users to share and discuss recipes, cooking techniques, and food-related topics. Our goal is to create a community of food enthusiasts who are passionate about cooking and sharing their culinary creations with others. We believe that everyone has something to contribute, whether it's a family recipe that has been passed down for generations or a new twist on a classic dish. So come join us and let's talk tasty recipes!

## Our structure in database is in the following format:

```js
{"posts": {
  "rxLb47p8sTM8Dzj5Qnjh1Y4YqAXP": {
    "author": "admin",
    "comments": {
      "rxLb47p8sTM8Dzj5Qnjh1Y4YqzH20": {
        "author": "normalUser",
        "content": "Content",
        "createdOn": "1715674133375",
        "lastEdited": "1715674142425",
        "likedBy": {
          "handle": "true",
            // ...
        }
      }
        // ...
    },
    "content": "Short description",
    "createdBy": "1715672101190",
    "likedBy": {
    "handle": "true"
      // ...
    },
    "recipe": "Recipe - Long description",
    "title": "Title",
    }
    // ...
  }
}
{
  "users": {
    "peter": {
      "email": "peter@domain.com",
      "firstName": "peter",
      "handle": "peter",
      "isBlocked": "false",
      "lastName": "petkov",
      "likedComments": "",
      "likedPosts": {
        "rxLb47p8sTM8Dzj5Qnjh1Y4Yq123": "true"
         // ...
      },
      "likedComments": {
        "rxLb47p8sTM8Dzj5Qnjh1Y4Yktmv": "true",
        // ...
      },
      "uid": "rxLb47p8sTM8Dzj5Qnjh1Y4YqHE3",
      "userRole": "user"
  }
  // ...
}}
```

## Contributing

We welcome contributions from anyone who is interested in sharing their knowledge and passion for cooking. Whether you're a seasoned chef or a novice cook, we encourage you to get involved and help us build a diverse and vibrant community of food lovers. Here are a few ways you can contribute:

- Submit a recipe: Share your favorite recipes with the community and help inspire others to get cooking.
- Comment on recipes: Leave feedback, suggestions, and tips on recipes to help others improve their cooking skills.
- Start a discussion: Initiate a conversation about a food-related topic that interests you and engage with other users who share your passion.
- Report issues: If you encounter any bugs, errors, or other issues with the site, please let us know so we can address them promptly.
- Spread the word: Tell your friends, family, and social networks about Tasty Recipe Talk and help us grow our community.
  We look forward to hearing from you and seeing what delicious recipes you have to share!

## Contact

If you have any questions, comments, or feedback about Tasty Recipe Talk, please feel free to [contact us](mailto:mail@trt.com)
