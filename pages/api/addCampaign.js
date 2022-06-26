import { db } from "../../firebase";

export default async function handler(req, res) {
  const newCampaign = req.body.newCampaign;
  if (req.method === "POST") {
    await db.collection("campaigns").add(newCampaign);
    return res
      .status(201)
      .json({ message: "Successfully saved to database", data: newCampaign });
  }
}
