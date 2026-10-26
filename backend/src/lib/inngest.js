import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser } from "./stream.js";
import { syncClerkUser } from "./userSync.js";

export const inngest = new Inngest({ id: "hiresync" });

const syncUser = inngest.createFunction(
  { id: "sync-user", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses = [], first_name, last_name, image_url } = event.data;
    const email =
      email_addresses.find((address) => address.id === event.data.primary_email_address_id)
        ?.email_address || email_addresses[0]?.email_address;

    if (!id || !email) {
      throw new Error("Clerk user.created event is missing the user ID or email");
    }

    await syncClerkUser({
      clerkId: id,
      email,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      profileImage: image_url || "",
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];