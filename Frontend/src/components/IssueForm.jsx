import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import { submitIssue, issueToast } from "./../Auth/Issue";
import { useEffect } from "react";
export default function IssueForm({
  position,
  setPosition,
  register,
  handleSubmit,
  formState,
}) {
  const { errors, isSubmitting } = formState;
  const token = localStorage.getItem("token");
  const [, setResponse] = useState(null);
  const [disable, setDisable] = useState(false);

  useEffect(()=>{
    document.title = 'Issue Form'
  },[])
  function getLocation(e) {
    e.preventDefault();
    setDisable(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (location) {
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          setPosition([latitude, longitude]);
        },
        function () {
          toast("Error getting geolocation:", {
            theme: "light",
            type: "error",
            position: "top-center",
            autoClose: 2000,
          });
        }
      );
    } else {
      toast("Geolocation is not supported by this browser.", {
        theme: "light",
        type: "error",
        position: "top-center",
        autoClose: 2000,
      });
    }
  }

  const searchPlace = async (city, street) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
        city
      )}&street=${encodeURIComponent(street)}&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const coordinates = data[0];
        return coordinates;
      } else {
        toast("Place not found !", {
          theme: "light",
          type: "error",
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast("Place not found !", {
        theme: "light",
        type: "error",
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  async function onSubmit(data) {
    try {
      if (disable) {
        console.log("disabled field");
        data.latitude = position[0];
        data.longitude = position[1];
      } else {
        const coordinates = await searchPlace(data.city, data.street);
        data.latitude = coordinates.lat;
        data.longitude = coordinates.lon;
      }
      const response = await submitIssue(data, token);
      setResponse(response);
      issueToast(response);
    } catch (error) {
      setResponse(error.response);
     
    }
  }

  return (
    <>
      <div className="col-md-6 overflow-auto">
        <h4>Report an Issue</h4>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-group mt-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Enter issue title"
              {...register("title", {
                required: {
                  value: true,
                  message: "Please Enter Title",
                },
                minLength: { value: 4, message: "Minimum Length is 4" },
                maxLength: {
                  value: 45,
                  message: "Maximum Length is 45",
                },
              })}
            />
            {errors.title && (
              <small className="red">{errors.title.message}</small>
            )}
          </div>
          <div className="form-group mt-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter Description"
              {...register("description", {
                required: {
                  value: true,
                  message: "Please Enter description",
                },
                minLength: { value: 10, message: "Minimum Length is 10" },
                maxLength: {
                  value: 75,
                  message: "Maximum Length is 75",
                },
              })}
            />
            {errors.description && (
              <small className="red">{errors.description.message}</small>
            )}
          </div>
          {!disable && (
            <>
              <div className="form-group mt-2">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter city"
                  name="city"
                  {...register("city", {
                    required: {
                      value: true,
                      message: "Please Enter city",
                    },
                    minLength: {
                      value: 4,
                      message: "Minimum Length is 4",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum Length is 20",
                    },
                  })}
                />
                {!disable && errors.city && (
                  <small className="red">{errors.city.message}</small>
                )}
              </div>
              <div className="form-group mt-2">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder="Enter street"
                  name="street"
                  {...register("street", {
                    required: {
                      value: true,
                      message: "Please Enter street",
                    },
                    minLength: {
                      value: 10,
                      message: "Minimum Length is 10",
                    },
                    maxLength: {
                      value: 20,
                      message: "Maximum Length is 20",
                    },
                  })}
                />
                {!disable && errors.street && (
                  <small className="red">{errors.street.message}</small>
                )}
              </div>
            </>
          )}
          <div className="form-group mt-2">
            <label>Upload Images</label>
            <br />
            <input
              type="file"
              className="form-control-file mt-1"
              id="imageOne"
              accept="image/*"
              name="imageOne"
              {...register("imageOne", {
                required: {
                  value: true,
                  message: "Please Enter Image",
                },
              })}
            />
            {errors.imageOne && (
              <small className="red">{errors.imageOne.message}</small>
            )}
            <input
              type="file"
              className="form-control-file mt-1"
              id="imageTwo"
              name="imageTwo"
              accept="image/*"
              {...register("imageTwo", {
                required: {
                  value: true,
                  message: "Please Enter Image",
                },
              })}
            />
            {errors.imageTwo && (
              <small className="red">{errors.imageTwo.message}</small>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-dark mt-2"
          >
            Submit
          </button>{" "}
          <button
            className="btn btn-dark mt-2"
            disabled={isSubmitting}
            onClick={getLocation}
          >
            Get Current location
          </button>
        </form>
      </div>
    </>
  );
}

IssueForm.propTypes = {
  setPosition: PropTypes.func.isRequired,
  position: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    errors: PropTypes.shape({
      title: PropTypes.object,
      description: PropTypes.object,
      city: PropTypes.object,
      street: PropTypes.object,
      imageOne: PropTypes.object,
      imageTwo: PropTypes.object, // Add validation for imageTwo error object
    }).isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  }).isRequired,
};
