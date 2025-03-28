import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { login, useAuthStore, AuthStatus } from "../hooks/useAuthTest";

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
    console.log(status);
    if (status === AuthStatus.AUTHENTICATED) {
      navigate("/dashboard");
    } else if (status === AuthStatus.ERROR_CREDENTIALS) {
      setError("root", { message: "Error Credentials !" });
    }
  }, [status]);

  return (
    <form
      className="d-flex flex-column gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center">
        <label className="form-label text-center">
          {type == "staff" ? "username" : "email"}
        </label>
        <input
          className="form-control text-center"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <div className="text-danger fst-italic mt-2">
            <strong>{errors.username.message}</strong>
          </div>
        )}
      </div>
      <div className="text-center">
        <label className="form-label text-center">Password</label>
        <input
          className="form-control text-center"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <div className="text-danger fst-italic mt-2">
            <strong>{errors.password.message}</strong>
          </div>
        )}
      </div>

      <input className="mt-5 btn btn-success" type="submit" />
      {errors.root && (
        <div className="text-danger fst-italic mt-2">
          <strong>{errors.root.message}</strong>
        </div>
      )}
    </form>
  );
}

export default AuthForm;
