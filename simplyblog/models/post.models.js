import BlogSchema from "../schemas/blog.schema.js";
// all the crud operations close to database layer will be performed her for the blogs post
// Fetch all the post
// fetch all the post of author
export const getBlogs = (filter) => {
  return BlogSchema.find(filter);
};
// fetch single post according to filter
export const getBlog = (filter) => {
  return BlogSchema.findOne(filter);
};
// create new post
export const insertBlog = (obj) => {
  return BlogSchema(obj).save();
};
// update new post
export const updateBlog = (id, obj) => {
  return BlogSchema.findByIdAndUpdate(id, obj, {new: true});
};
// delete a post
export const deleteBlog = (obj) => {
  return BlogSchema.findOneAndDelete(obj);
};
// delete all the post which match
export const deleteMultipleBlogs = (ids) => {
  return BlogSchema.deleteMany({ authorID: { $in: ids } });
};
