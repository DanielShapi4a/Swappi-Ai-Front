import "./SellForm.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../pages/contexts/authContext.js";
import { createTicket, updateTicket, getCategoryNames } from "../../services/productData.js";
import { useNavigate } from 'react-router-dom';

// SellForm Component: This component is responsible for rendering a form to create or edit a ticket for selling.

// Destructuring the useForm() hook from react-hook-form library.
// This hook is used for managing form state and validation.
// The following destructuring assignment extracts specific properties and methods from the object returned by useForm().

// - register: A function that registers inputs with the form, associating them with form state and validation rules.
// - handleSubmit: A function that handles form submission.
// - formState: An object containing various state properties related to the form.
//              Here, we're extracting the 'errors' property from 'formState' using object destructuring.
//              'errors' contains validation errors for each form field.
// - setValue: A function used to dynamically set values for form fields. It's useful for pre-populating form fields with data

const SellForm = ({ data }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitRes, setSubmitRes] = useState("");
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data.title) {
      console.log("we got some data:#", data);
      setValue("title", data.title || "");
      setValue("category", data.category || "");
      setValue("description", data.description || "");
      setValue("price", data.price || "");
      setValue("location", data.location || "");
      setValue("eventDateTime", data.eventDateTime ? new Date(data.eventDateTime).toISOString().slice(0, 16) : "");
    }
  }, [data, setValue]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoryData = await getCategoryNames();
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const onSubmit = async (formData) => {
    let res;
    if (data && data._id) {
      res = await updateTicket(user, data._id, formData);
    } else {
      res = await createTicket(user, formData);
    }
    setSubmitRes(res);
    console.log("Response Console Log", res);
    
    if (res === true) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="sell-form-container">
      <h3 className="sell-form-header">{data && data._id ? "Edit Sell" : "Create a New Sell"}</h3>
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
          <select
            id="category"
            {...register("category", {
              required: "Category is required.",
            })}
            defaultValue={data ? data.category : ""}
          >
            <option value={""}>Select a category...</option>
            {categories.map((category, index) => 
              <option key={index} value={category.category_Name}>
                {category.category_Name}
              </option>
            )}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className="sell-form-input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            style={{ resize: "none" }}
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
            <h5>Ticket {data && data._id ? "Updated" : "Created"} Successfully</h5>
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