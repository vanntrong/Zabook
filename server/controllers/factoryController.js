import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export async function createOne(Model, data, res) {
  const doc = await Model.create(data);
  if (Model === User) {
    const { password, ...other } = doc._doc;
    return res.status(201).json({ ...other });
  }
  return res.status(201).json(doc);
}

export async function updateOne(Model, id, update, res) {
  const newDoc = await Model.findByIdAndUpdate(id, update, { new: true });

  if (!newDoc) {
    return res.status(404).json("Document not found");
  }

  if (Model === User) {
    const { password, ...other } = newDoc._doc;
    return res.status(200).json({ ...other });
  }
  return res.status(200).json(newDoc);
}

export async function deleteOne(Model, id, res) {
  const doc = await Model.findByIdAndDelete(id);

  if (!doc) {
    return res.status(404).json("Document not found");
  }

  return res.status(204).json("Document deleted");
}

export async function findOne(Model, filter, popOptions) {
  let query = Model.findOne(filter);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;
  return doc;
}

export async function findAll(Model, filter, page, popOptions) {
  let query = Model.find(filter);
  query = query
    .populate(popOptions)
    .limit(10)
    .skip(10 * page)
    .sort();
  const docs = await query;
  return docs;
}

export function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export async function uploadFile(file, folder, type) {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: type,
  });
  return result;
}
