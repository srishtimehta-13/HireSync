import { clerkClient } from "@clerk/express";
import User from "../models/User.js";
import { upsertStreamUser } from "./stream.js";

export async function syncClerkUser(userData) {
  const { clerkId, email, name, profileImage = "" } = userData;

  if (!clerkId || !email) {
    throw new Error("Clerk user ID and email are required to sync a user");
  }

  const normalizedName = name?.trim() || email;

  await upsertStreamUser({
    id: clerkId,
    name: normalizedName,
    image: profileImage,
  });

  return User.findOneAndUpdate(
    { clerkId },
    {
      $set: {
        clerkId,
        email,
        name: normalizedName,
        profileImage,
      },
    },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );
}

export async function syncClerkUserById(clerkId) {
  const clerkUser = await clerkClient.users.getUser(clerkId);
  const email =
    clerkUser.emailAddresses.find(
      (address) => address.id === clerkUser.primaryEmailAddressId
    )?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error(`Clerk user ${clerkId} has no email address`);
  }

  return syncClerkUser({
    clerkId,
    email,
    name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" "),
    profileImage: clerkUser.imageUrl || "",
  });
}
