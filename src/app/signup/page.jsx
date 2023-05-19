"use client";
import OAuth from "../../components/OAuth";

import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase";
import { serverTimestamp, setDoc,doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function signUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const router = useRouter();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault(); //これを加えるとsignupボタンを押してもページが再読み込みされない

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        //入力フォームから受け取ったデータ
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      router.push("/"); //ユーザをデータベースに加えた後に、Homeへ戻るようにする。
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-x-6xl mx-auto">
        {/* mdより大きいと67%,lgより大きいと50%の意味 */}
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="氏名"
              className="mb-6 w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="mb-6 ">
                アカウントお持ちの方は
                <Link
                  href="/signin"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  コチラ
                </Link>
              </p>
              <p>
                パスワードを忘れた方は
                <Link
                  href="/forgotpassword"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                >
                  コチラ
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 //クリックした時にもっと暗い青にする"
              type="submit"
            >
              Sign Up
            </button>
            <div className="flex items-center my-4 before:border-t  before:flex-1  before:border-gray-500 after:border-t  after:flex-1  after:border-gray-500">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
