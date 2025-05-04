import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { login, useAuthStore, AuthStatus } from "../hooks/useAuth";

interface RegisterForm {
  username: String;
  password: String;
}

type TestAuthType = {
  type: string;
};

export function AuthForm({ type }: TestAuthType) {
  const navigate: NavigateFunction = useNavigate();
  const status = useAuthStore((state) => state.status);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    login(formData, type);
  };

  useEffect(() => {
    if (status === AuthStatus.AUTHENTICATED) {
      navigate("/dashboard");
    } else if (status === AuthStatus.ERROR_CREDENTIALS) {
      setError("root", { message: "Error Credentials !" });
    }
  }, [status]);

  return (
    <form
      className="flex flex-col mb-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center">
        <label className="block text-gray-800">
          {type == "staff" ? "username" : "email"}
        </label>
        <input
          className="mt-2 form-input block w-full rounded-xl border border-gray-300 p-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <div className="text-danger fst-italic mt-2">
            <strong>{errors.username.message}</strong>
          </div>
        )}
      </div>
      <div className="text-center mt-3">
        <label className="form-label text-center">Password</label>
        <input
          className="mt-2 form-input block w-full rounded-xl border border-gray-300 p-2 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <div className="text-danger fst-italic mt-2">
            <strong>{errors.password.message}</strong>
          </div>
        )}
      </div>

      <button type="submit" className="mt-5 rounded-xl bg-green-700 text-white p-2 hover:bg-green-600 cursor-pointer">Submit</button>
      {errors.root && (
        <div className="text-danger fst-italic mt-2">
          <strong>{errors.root.message}</strong>
        </div>
      )}
    </form>
  );
}

export default AuthForm;
