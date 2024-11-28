import { Login } from './Login';
import { Register } from './Register';

function Access() {
  return (
    <div className="d-flex justify-content-center m-5">
      <div className="m-5">
        <Login />
      </div>
      <div className="m-5">
        <Register />
      </div>
    </div>
  );
}

export { Access };
