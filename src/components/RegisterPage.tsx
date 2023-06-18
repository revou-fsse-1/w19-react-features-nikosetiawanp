import { SetStateAction, useState, useCallback } from "react";

export default function RegisterPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegisterEmailChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setRegisterEmail(event.target.value);
    },
    []
  );
  const handleRegisterPasswordChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setRegisterPassword(event.target.value);
    },
    []
  );
  const handleRegisterNameChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setRegisterName(event.target.value);
    },
    []
  );

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

  const handleFormSubmit = (event: React.ChangeEvent<any>) => {
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

    fetch("https://mock-api.arikmpt.com/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
          console.log("Register Successful");
        }
        {
          throw new Error("Post Failed");
        }
      })
      .then(function (responseBody) {
        console.log(responseBody.url);
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <img
        className="absolute -z-50 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1568528139106-c295280e4757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        alt="background-image"
      />
      <div className="absolute -z-10 h-full w-full bg-black/50 backdrop-blur-sm"></div>
      {/* <Logo /> */}
      <form
        className="relative flex h-full w-full max-w-lg flex-col items-start gap-8 overflow-hidden bg-white p-12 shadow-2xl md:h-fit md:rounded-2xl"
        onSubmit={handleFormSubmit}
      >
        <h1 className="self-center text-4xl font-bold">Register</h1>
        {/* EMAIL */}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          onChange={handleRegisterNameChange}
          className={`${
            nameError === true ? "border-red-500" : null
          } relative w-full border-b-2 bg-white/5 py-2 outline-none transition-colors duration-300 placeholder:font-semibold placeholder:text-gray-300 focus:border-red-500 focus:placeholder:text-white`}
        />

        {nameError === true ? (
          <span className="-mt-8 text-sm font-medium text-red-500 ">
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
          } placeholder:semibold relative w-full border-b-2 bg-white/5 py-2 outline-none transition-colors duration-300 placeholder:text-gray-300 focus:border-red-500 focus:placeholder:text-white`}
        />
        {emailError === true ? (
          <span className="-mt-8 text-sm font-medium text-red-500 ">
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
          } relative w-full border-b-2 bg-white/5 py-2 outline-none transition-colors duration-300 placeholder:font-semibold placeholder:text-gray-300 focus:border-red-500 focus:placeholder:text-white`}
        />
        {passwordError === true ? (
          <span className="-mt-8 text-sm font-medium text-red-500 ">
            Minimum password length is 6 characters
          </span>
        ) : null}

        <input
          type="submit"
          value="Register"
          className="duration:300 mt-8 w-full rounded-full bg-red-600 py-2 text-center font-bold text-white transition-transform hover:scale-105 hover:cursor-pointer hover:shadow-md active:scale-100"
        />
        <span className="self-center shadow-2xl">
          Already have an account? &nbsp;
          <a
            className="font-bold text-red-500 "
            href="http://localhost:5173/login"
          >
            Login
          </a>
        </span>
      </form>
    </div>
  );
}
