import {useDispatch} from 'react-redux';
import {user} from '../interfaces/auth/authInterface';
import {updateUserData} from '../redux/reducers/user';
import {deleteUserData, saveUserData} from '../utlis/auth';

export const useAuthHooks = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await deleteUserData();
    dispatch(updateUserData(false));
  };

  const handleUserLogin = async (data: user) => {
    dispatch(updateUserData(true));
    saveUserData(data);
  };

  return {
    handleLogout,
    handleUserLogin,
  };
};
