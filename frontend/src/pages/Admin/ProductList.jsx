import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
// import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);
      console.log("test_me");

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      console.log("res");
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] p-4 pt-8">
      <div className="h-12 font-semibold text-xl">Create Product</div>
      <div className="border shadow-md rounded-md p-4 grid grid-cols-2 gap-4">
        <div className="">
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <label className="px-4 block w-full text-teal-800 text-center text-sm rounded-lg cursor-pointer font-bold">
            {image ? image.name : "Upload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : ""}
            />
          </label>
        </div>
        <div className="">
          <label htmlFor="name">Name</label> <br />
          <input
            type="text"
            className="p-4 mb-3 w-full border rounded-lg bg-slate-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="name block">Price</label> <br />
          <input
            type="number"
            className="p-4 mb-3 w-full border rounded-lg bg-slate-100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="name block">Quantity</label> <br />
          <input
            type="number"
            className="p-4 mb-3 w-full border rounded-lg bg-slate-100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="name block">Brand</label> <br />
          <input
            type="text"
            className="p-4 mb-3 w-full border rounded-lg bg-slate-100"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="" className="my-5">
            Description
          </label>
          <textarea
            type="text"
            className="p-2 mb-3 bg-slate-100 border rounded-lg w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="name block">Count In Stock</label> <br />
          <input
            type="text"
            className="p-4 mb-3 w-full border rounded-lg bg-slate-100"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Category</label> <br />
          <select
            placeholder="Choose Category"
            className="p-4 mb-3 w-full border rounded-lg bg-slate-100"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-yellow-500 text-white mx-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductList;
