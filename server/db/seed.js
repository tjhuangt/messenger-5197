const db = require("./db");
const { User } = require("./models");
const Conversation = require("./models/conversation");
const Message = require("./models/message");
const Conversation_User = require("./models/Conversation_User");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const thomas = await User.create({
    username: "thomas",
    email: "thomas@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png",
  });

  const santiago = await User.create({
    username: "santiago",
    email: "santiago@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png",
  });

  const convo = await Conversation.create({});

  const thomasConvo = await Conversation_User.create({
    conversationId: convo.id,
    userId: thomas.id
  });
  const santaigoConvo = await Conversation_User.create({
    conversationId: convo.id,
    userId: santiago.id
  });

  await Message.create({
    conversationUserId: santaigoConvo.id,
    text: "Where are you from?",
  });
  await Message.create({
    conversationUserId: thomas.id,
    text: "I'm from New York",
  });
  await Message.create({
    conversationUserId: santaigoConvo.id,
    text: "Share photo of your city, please",
  });

  const chiumbo = await User.create({
    username: "chiumbo",
    email: "chiumbo@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/8bc2e13b8ab74765fd57f0880f318eed1c3fb001_fownwt.png",
  });
  const convo2 = await Conversation.create({});
  const chiumboConvo = await Conversation_User.create({
    conversationId: convo2.id,
    userId: chiumbo.id
  });
  const thomasConvo2 = await Conversation_User.create({
    conversationId: convo2.id,
    userId: thomas.id
  });
  await Message.create({
    conversationUserId: chiumboConvo.id,
    text: "Sure! What time?",
  });

  const hualing = await User.create({
    username: "hualing",
    email: "hualing@email.com",
    password: "123456",
    photoUrl:
      "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/6c4faa7d65bc24221c3d369a8889928158daede4_vk5tyg.png",
  });
  const convo3 = await Conversation.create({});
  const hualingConvo = await Conversation_User.create({
    conversationId: convo3.id,
    userId: hualing.id
  });
  const thomasConvo3 = await Conversation_User.create({
    conversationId: convo3.id,
    userId: thomas.id
  });

  for (let i = 0; i < 11; i++) {
    await Message.create({
      conversationUserId: hualingConvo.id,
      text: "a test message",
    });
  }

  await Message.create({
    conversationUserId: hualingConvo.id,
    text: "😂 😂 😂",
  });

  const otherUsers = await Promise.all([
    ,
    User.create({
      username: "ashanti",
      email: "ashanti@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/68f55f7799df6c8078a874cfe0a61a5e6e9e1687_e3kxp2.png",
    }),
    User.create({
      username: "julia",

      email: "julia@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914468/messenger/d9fc84a0d1d545d77e78aaad39c20c11d3355074_ed5gvz.png",
    }),
    User.create({
      username: "cheng",
      email: "cheng@email.com",
      password: "123456",
      photoUrl:
        "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/9e2972c07afac45a8b03f5be3d0a796abe2e566e_ttq23y.png",
    }),
  ]);
  
  console.log(`seeded users and messages`);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
