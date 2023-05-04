import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = email ? { email } : { phone: +phone };
  const token = await client.token.create({
    data: {
      payload: "1234",
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "Anonymus",
            ...payload,
          },
        },
      },
    },
  });

  console.log(token)

  /*   if (email) {
    let user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("did not find. Will create");
      user = await client.user.create({
        data: {
          name: "Anonymus",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    let user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("did not find. Will create");
      user = await client.user.create({
        data: {
          name: "Anonymus",
          phone: +phone,
        },
      });
    }
    console.log(user);
  } */
  return res.status(200).end();
}

export default withHandler("POST", handler);
