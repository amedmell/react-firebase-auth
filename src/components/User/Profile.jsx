import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebase/firebase";

export default function Profile(props) {
  const INPUT_STYLING =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const LABEL_STYLING =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    const idd = e.target.id;
    setProfile({
      uid: props.uid,
      email: props.email,
      [idd]: value,
      ...profile,
    });
    console.log(profile);
  };

  //upload image
  const handleImage = () => {
    const storage = getStorage();

    const storageRef = ref(storage, "profile-image");

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log(snapshot);
      console.log("Uploaded a blob or file!");
    });
  };

  //adding & updating user profile
  const handleProfile = async (e) => {
    e.preventDefault();
    console.log(profile);
    // Add a new document with a generated id.
    if (image !== null) handleImage(); //handle image upload

    await setDoc(doc(db, "users", props.uid), {
      ...profile,
      timeStamp: serverTimestamp(),
    });
  };

  return (
    <>
      <form onSubmit={handleProfile}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="image"
            >
              Profile Photo
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              className={INPUT_STYLING}
              id="image"
              type="file"
            />
          </div>
          <div>
            <label htmlFor="first_name" className={LABEL_STYLING}>
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className={INPUT_STYLING}
              placeholder="John"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="last_name" className={LABEL_STYLING}>
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              className={INPUT_STYLING}
              placeholder="Doe"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="company" className={LABEL_STYLING}>
              Company
            </label>
            <input
              type="text"
              id="company"
              className={INPUT_STYLING}
              placeholder="Flowbite"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className={LABEL_STYLING}>
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              className={INPUT_STYLING}
              placeholder="123-45-678"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="website" className={LABEL_STYLING}>
              Website URL
            </label>
            <input
              type="url"
              id="website"
              className={INPUT_STYLING}
              placeholder="flowbite.com"
              required=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className={LABEL_STYLING}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              className={INPUT_STYLING}
              value={props.email}
              onChange={handleChange}
              required=""
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Profile
        </button>
      </form>
    </>
  );
}
