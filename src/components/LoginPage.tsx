import { SetStateAction, useState, useCallback } from "react";

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginEmailChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setLoginEmail(event.target.value);
    },
    []
  );

  const handleLoginPasswordChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setLoginPassword(event.target.value);
    },
    []
  );

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

    if (!loginEmail) {
      showEmailError();
    } else if (loginEmail) {
      hideEmailError();
    }

    if (!loginPassword || loginPassword.length < 6) {
      showPasswordError();
    } else if (loginPassword) {
      hidePasswordError();
    }

    if (!loginEmail || !loginPassword || loginPassword.length < 6) return;

    fetch("https://mock-api.arikmpt.com/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        {
          throw new Error("Invalid Email / Password");
        }
      })
      .then(function (responseBody) {
        localStorage.setItem("accessToken", responseBody.data.token);
        console.log(responseBody.data.token);
        alert("Login successful, redirecting...");
        window.location.replace("http://localhost:5173/homepage");
      })
      .catch(function (error) {
        setErrorMessage((errorMessage) => {
          return (errorMessage = error);
        });
        alert(error);
        console.log(errorMessage);
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
        <h1 className="self-center text-4xl font-bold">Log in</h1>

        {/* EMAIL */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          onChange={handleLoginEmailChange}
          className={`${
            emailError === true ? "border-red-500" : null
          } relative w-full border-b-2 bg-white/5 py-2 outline-none transition-colors duration-300 placeholder:font-semibold placeholder:text-gray-300 focus:border-red-500 focus:placeholder:text-white`}
        />
        {emailError === true ? (
          <span className="-mt-8 text-sm font-medium text-red-500 ">
            Email must not be empty
          </span>
        ) : null}

        {/* PASSWORD */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handleLoginPasswordChange}
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
          value="Log in"
          className="duration:300 mt-8 w-full rounded-full bg-red-600 py-2 text-center font-bold text-white transition-transform hover:scale-105 hover:cursor-pointer hover:shadow-md active:scale-100"
        />
        <span className="text-md w-full font-medium text-red-500">
          {/* {errorMessage} */}
        </span>
        <span className="self-center shadow-2xl">
          Don't have an accqunt? &nbsp;
          <a
            className="font-bold text-red-500 "
            href="http://localhost:5173/register"
          >
            Register here
          </a>
        </span>
      </form>
    </div>
  );
}
