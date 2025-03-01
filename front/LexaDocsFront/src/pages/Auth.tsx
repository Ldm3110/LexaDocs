import { AuthForm } from './../components/AuthForm';

function Auth() {

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-black p-4 rounded-5 shadow-lg" style={{ width: "350px" }}>
          <h2 className="text-center mb-4"><strong>Lexadocs</strong></h2>
          <div className="d-flex flex-column mb-3">
            <AuthForm />
          </div>
        </div>
      </div >
    </>
  )
}

export default Auth
