import { SetStateAction, useState } from "react";
import Logo from "./Logo";

export default function RegisterPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegisterEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRegisterEmail(event.target.value);
  };
  const handleRegisterPasswordChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRegisterPassword(event.target.value);
  };
  const handleRegisterNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRegisterName(event.target.value);
  };

  const showNameError = () => {
    setNameError((nameError: boolean) => (nameError = true));
  };
  const hideNameError = () => {
    setNameError((nameError: boolean) => (nameError = false));
  };

  const showEmailError = () => {
    setEmailError((emailError: boolean) => (emailError = true));
  };
  const hideEmailError = () => {
    setEmailError((emailError: boolean) => (emailError = false));
  };
  const showPasswordError = () => {
    setPasswordError((passwordError: boolean) => (passwordError = true));
  };
  const hidePasswordError = () => {
    setPasswordError((passwordError: boolean) => (passwordError = false));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!registerEmail) {
      showEmailError();
    } else if (registerEmail) {
      hideEmailError();
    }

    if (!registerName) {
      showNameError();
    } else if (registerName) {
      hideNameError();
    }

    if (!registerPassword || registerPassword.length < 6) {
      showPasswordError();
    } else if (registerPassword) {
      hidePasswordError();
    }

    if (
      !registerEmail ||
      !registerName ||
      !registerPassword ||
      registerPassword.length < 6
    )
      return;

    const formData = {
      registerEmail,
      registerName,
      registerPassword,
    };
    alert(JSON.stringify(formData));
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <img
        className="h-full w-full object-cover -z-50 absolute"
        src="https://images.unsplash.com/photo-1568528139106-c295280e4757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt="background-image"
      />
      <div className="bg-black/50 -z-10 w-full h-full absolute backdrop-blur-sm"></div>
      {/* <Logo /> */}
      <form
        className="flex relative flex-col gap-8 items-start max-w-lg p-12 h-full md:h-fit w-full md:rounded-2xl shadow-2xl overflow-hidden bg-white"
        onSubmit={handleFormSubmit}
      >
        <h1 className="font-bold text-4xl self-center">Register</h1>
        {/* EMAIL */}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          onChange={handleRegisterNameChange}
          className={`${
            nameError === true ? "border-red-500" : null
          } border-b-2 bg-white/5 relative w-full py-2 outline-none focus:border-red-500 focus:placeholder:text-white placeholder:font-bold placeholder:text-gray-300 transition-colors duration-300`}
        />

        {nameError === true ? (
          <span className="text-red-500 text-sm font-medium -mt-8 ">
            Name must not be empty
          </span>
        ) : null}

        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={handleRegisterEmailChange}
          className={`${
            emailError === true ? "border-red-500" : null
          } border-b-2 bg-white/5 relative w-full py-2 outline-none focus:border-red-500 focus:placeholder:text-white placeholder:font-bold placeholder:text-gray-300 transition-colors duration-300`}
        />
        {emailError === true ? (
          <span className="text-red-500 text-sm font-medium -mt-8 ">
            Email must not be empty
          </span>
        ) : null}

        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handleRegisterPasswordChange}
          className={`${
            passwordError === true ? "border-red-500" : null
          } border-b-2 bg-white/5 relative w-full py-2 outline-none focus:border-red-500 focus:placeholder:text-white placeholder:font-bold placeholder:text-gray-300 transition-colors duration-300`}
        />
        {passwordError === true ? (
          <span className="text-red-500 text-sm font-medium -mt-8 ">
            Minimum password length is 6 characters
          </span>
        ) : null}

        <input
          type="submit"
          value="Register"
          className="bg-red-600 text-white text-center font-bold w-full py-2 mt-8 rounded-full hover:scale-105 hover:shadow-md hover:cursor-pointer active:scale-100 transition-transform duration:300"
        />
        <span className="self-center shadow-2xl">
          Already have an account? &nbsp;
          <a className="text-red-500 font-bold " href="#">
            Login
          </a>
        </span>
      </form>
    </div>
  );
}
