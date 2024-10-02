import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../redux/selectors';
import { ERROR } from '../../constans/error';
import { checkAccess } from '../../utils/check-access';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENID;

	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
