import "./SellFrom.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../pages/contexts/authContext.js";
import { createTicket } from "../../services/productData.js";

const SellForm = () => {
  const { user } = useAuth();
  const [submitRes, setSubmitRes] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await createTicket(user, data);
    setSubmitRes(res);
    console.log("Respose Console Log", res);
  };

  return (
    <div className="sell-form-container">
      <h3 className="sell-form-header">Create a New Sell</h3>
      <form className="sell-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="sell-form-input">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 3,
                message: "Title should be at least 3 characters long.",
              },
              maxLength: {
                value: 50,
                message: "Title cannot be more than 50 characters long.",
              },
            })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <div className="sell-form-input">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            {...register("category", {
              required: "Category is required.",
            })}
          />
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className="sell-form-input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required.",
              minLength: {
                value: 10,
                message: "Description should be at least 10 characters long.",
              },
              maxLength: {
                value: 1000,
                message: "Description can't exceed 1000 characters long.",
              },
            })}
          ></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="sell-form-input">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            {...register("price", {
              required: "Price is required.",
            })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div className="sell-form-input">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            {...register("location", {
              required: "Location is required.",
            })}
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>

        <div className="sell-form-input">
          <label htmlFor="eventDateTime">Event Date & Time</label>
          <input
            id="eventDateTime"
            type="datetime-local"
            {...register("eventDateTime", {
              required: "Event Date & Time is required.",
            })}
          />
          {errors.eventDateTime && <p>{errors.eventDateTime.message}</p>}
        </div>

        <div className="sell-form-buttons">
          <button type="submit">Submit</button>
          {submitRes === true ? (
            <h5>Ticket Created Successfully</h5>
          ) : submitRes === false ? (
            <h5>There seems to be a problem, please check ticket details</h5>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellForm;
